import {
  CreateSpeechBallonInputSchema,
  UpdateSpeechBallonInputSchema,
} from '@/libs/schema/speechballon'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { z } from 'zod'

export class SpeechBallonService {
  async create(
    user: User,
    { template_id, ...resCreate }: z.infer<typeof CreateSpeechBallonInputSchema>,
  ) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id,
        template: {
          deleted_at: null,
        },
      },
    })

    if (!checkUserTemplate) {
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

  async update(user: User, { id, ...resCreate }: z.infer<typeof UpdateSpeechBallonInputSchema>) {
    const checkSpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
      },
    })

    if (!checkSpeechBallon) {
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
