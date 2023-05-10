import { CreateSpeechBallonType, UpdateSpeechBallonType } from '@/libs/schema/speechballon'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'

export class SpeechBallonService {
  async create(user: User, { template_id, ...resCreate }: CreateSpeechBallonType) {
    const UserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id,
        template: {
          deleted_at: null,
        },
      },
    })

    if (!UserTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    const speechBallon = await prisma.speechBallon.create({
      data: {
        template_id,
        ...resCreate,
      },
    })
    return speechBallon
  }

  async update({ id, ...resCreate }: UpdateSpeechBallonType) {
    const SpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
      },
    })

    if (!SpeechBallon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.speechballon_not_found',
      })
    }

    const speechBallon = await prisma.speechBallon.update({
      data: {
        ...resCreate,
      },
      where: {
        id,
      },
    })
    return speechBallon
  }
}
