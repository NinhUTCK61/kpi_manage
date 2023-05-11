import {
  CreateSpeechBallonInputType,
  UpdateSpeechBallonInputType,
} from '@/libs/schema/speechballon'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'

export class SpeechBallonService {
  async create(user: User, { template_id, ...resCreate }: CreateSpeechBallonInputType) {
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

  async update({ id, node_id, template_id, ...resCreate }: UpdateSpeechBallonInputType) {
    const SpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
        node_id,
        template_id,
      },
      include: {
        template: {
          include: {
            users: true,
          },
        },
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
