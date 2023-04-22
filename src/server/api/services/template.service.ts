import {
  LikeTemplateSchemaInput,
  TemplateDataOutputSchema,
  UpdateTemplateSchemaInput,
} from '@/libs/schema'
import { generateDefaultNode } from '@/libs/utils/node'
import { prisma } from '@/server/db'

import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { User } from 'next-auth'
import { z } from 'zod'

export class TemplateService {
  async list(userId: string, isTrash: boolean) {
    const deletedOpt = isTrash ? { not: null } : null
    const listTemplate = await prisma.userTemplate.findMany({
      where: {
        user_id: userId,
        template: {
          deleted_at: deletedOpt,
        },
      },
      orderBy: {
        template: {
          created_at: 'desc',
        },
      },
      include: {
        template: true,
      },
    })

    const templateData: z.infer<typeof TemplateDataOutputSchema> = []

    if (listTemplate.length) {
      listTemplate.forEach((item) => {
        const {
          template: { id: _, ...restTemplate },
        } = item

        templateData.push({
          template_id: item.template_id,
          can_edit: item.can_edit,
          is_favorite: item.is_favorite,
          is_owner: item.is_owner,
          ...restTemplate,
        })
      })
    }

    return templateData
  }

  async update({ id, ...restUpdate }: z.infer<typeof UpdateTemplateSchemaInput>, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id: id,
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

    const updateData = await prisma.template.update({
      where: { id },
      data: restUpdate,
    })

    return updateData
  }

  async create(user_id: string) {
    return await prisma.$transaction(async (tx) => {
      const rootNodeId = nanoid()
      const template = await tx.template.create({
        data: {
          name: 'New Template',
          root_note_id: rootNodeId,
          users: {
            create: {
              user_id,
              is_owner: true,
              can_edit: true,
            },
          },
        },
        include: {
          users: true,
        },
      })

      const nodeArr = generateDefaultNode(template.id, rootNodeId)

      await tx.node.createMany({
        data: nodeArr,
      })

      return template
    })
  }

  async like({ id, is_favorite }: z.infer<typeof LikeTemplateSchemaInput>, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id: id,
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

    const likeTemplate = await prisma.userTemplate.update({
      where: { id: checkUserTemplate.id },
      data: { is_favorite },
    })

    return likeTemplate
  }

  async delete(id: string, is_permanently: boolean, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id: id,
        is_owner: true,
        template: is_permanently
          ? {}
          : {
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

    if (is_permanently) {
      await prisma.template.delete({
        where: {
          id,
        },
      })
      return 'template.delete_template'
    }

    const date = new Date()
    await prisma.template.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: date,
      },
    })

    return 'template.move_to_trash'
  }

  async restore(id: string, user: User) {
    const checkUserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id: id,
      },
    })

    if (!checkUserTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    await prisma.template.update({
      where: { id },
      data: {
        deleted_at: null,
      },
    })

    return 'template.template_restore_success'
  }
}
