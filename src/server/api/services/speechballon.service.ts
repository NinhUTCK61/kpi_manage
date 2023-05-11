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

  async update(user: User, { id, template_id, node_id, ...resData }: UpdateSpeechBallonInputType) {
    const speechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
        template_id,
        node_id,
      },
    })

    if (!speechBallon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.speechballon_not_found',
      })
    }

    await this.validateUserTemplate(speechBallon.template_id, user.id)

    const updateData = await prisma.speechBallon.update({
      data: { ...resData },
      where: {
        id,
      },
    })

    return updateData
  }
}
