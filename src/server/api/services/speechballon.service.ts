import {
  CreateSpeechBallonInputType,
  DeleteSpeechBallonInputType,
  UpdateSpeechBallonInputType,
} from '@/libs/schema/speechballon'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { CommonHelper } from './helper/common.hepler'

export class SpeechBallonService extends CommonHelper {
  async create(user: User, speechBallon: CreateSpeechBallonInputType) {
    const { template_id, ...resCreate } = speechBallon
    const userTemplate = await this.validateUserTemplate(template_id, user.id)

    if (!userTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    const createData = await prisma.speechBallon.create({
      data: {
        template_id,
        ...resCreate,
      },
    })
    return createData
  }

  async update(user: User, speechBallon: UpdateSpeechBallonInputType) {
    const { id, template_id, node_id, ...resData } = speechBallon

    const querySpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
        template_id,
        node_id,
      },
    })

    if (!querySpeechBallon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.speechballon_not_found',
      })
    }

    await this.validateUserTemplate(querySpeechBallon.template_id, user.id)

    const updateData = await prisma.speechBallon.update({
      data: resData,
      where: {
        id,
      },
    })

    return updateData
  }

  async delete({ id }: DeleteSpeechBallonInputType, user: User) {
    const querySpeechBallon = await prisma.speechBallon.findFirst({
      where: {
        id,
      },
    })

    if (!querySpeechBallon) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.speechballon_not_found',
      })
    }

    await this.validateUserTemplate(querySpeechBallon.template_id, user.id)

    await prisma.speechBallon.delete({
      where: {
        id,
      },
    })

    return 'speechBallon.delete_speechBallon'
  }
}
