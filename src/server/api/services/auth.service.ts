import { prisma } from '@/server/db'
import MailUtils from '@/utils/mail'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'

class AuthService {
  model: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.model = prisma.user
  }

  async forgotPassword(email: string) {
    const user = await this.model.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found!',
      })
    }

    const token = nanoid()

    await prisma.passwordReset.upsert({
      where: {
        user_id: user.id,
      },
      update: {
        token,
      },
      create: {
        user_id: user.id,
        token,
      },
    })

    try {
      await MailUtils.getInstance().sendPasswordResetMail(user.email as string, token)
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Send mail failed!',
      })
    }

    return 'ok!'
  }
}

export default AuthService
