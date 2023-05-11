import {
  CreateSpeechBallonInputType,
  UpdateSpeechBallonInputType,
} from '@/libs/schema/speechballon'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { CommonHelper } from './helper/common.hepler'

export class SpeechBallonService extends CommonHelper {
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

  async update(user: User, speechBallon: UpdateSpeechBallonInputType) {
    const checkSpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id: speechBallon.id,
        template_id: speechBallon.template_id,
        node_id: speechBallon.node_id,
      },
    })

    if (!checkSpeechBallon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.speechballon_not_found',
      })
    }

    await this.validateUserTemplate(checkSpeechBallon.template_id, user.id)

    const updateSpeechBallon = await prisma.speechBallon.update({
      data: speechBallon,
      where: {
        id: speechBallon.id,
      },
    })

    return updateSpeechBallon
  }
}
