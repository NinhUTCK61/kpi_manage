import { UpdateTemplateSchema } from '@/libs/schema'
import { generateDefaultNode } from '@/libs/utils/node'
import { prisma } from '@/server/db'

import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { User } from 'next-auth'
import { z } from 'zod'

export class TemplateService {
  async getListTemplate(idUser: string) {
    const listTemplate = await prisma.user.findUnique({
      where: {
        id: idUser,
      },
      include: {
        userTemplate: true,
      },
    })
    if (!listTemplate) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already exists!',
      })
    }
    return listTemplate
  }

  async updateTemplate({ id, ...restUpdate }: z.infer<typeof UpdateTemplateSchema>, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        userId: user.id,
        template_id: id,
        template: {
          deleted_at: null,
        },
      },
    })

    if (!checkUserTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'err.template_not_found',
      })
    }

    const updateData = await prisma.template.update({
      where: { id },
      data: restUpdate,
    })

    return updateData
  }

  async createTemplate(userId: string) {
    return await prisma.$transaction(async (tx) => {
      const rootNodeId = nanoid()
      const template = await tx.template.create({
        data: {
          name: 'New Template',
          root_note_id: rootNodeId,
          userTemplate: {
            create: {
              userId,
              is_owner: true,
              can_edit: true,
            },
          },
        },
        include: {
          userTemplate: true,
        },
      })

      const nodeArr = generateDefaultNode(template.id, rootNodeId)

      await tx.node.createMany({
        data: nodeArr,
      })

      return template
    })
  }
}
