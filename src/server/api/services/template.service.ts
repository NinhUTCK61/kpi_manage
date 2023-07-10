import {
  LikeTemplateInputType,
  SearchTemplateInputType,
  TemplateType,
  UpdateTemplateInputType,
} from '@/libs/schema'
import { generateDefaultNode } from '@/libs/utils/node'
import { prisma } from '@/server/db'

import { TRPCError } from '@trpc/server'

import { nanoid } from 'nanoid'
import { User } from 'next-auth'
import { TemplateHelper } from './helper/template.helper'

export class TemplateService extends TemplateHelper {
  async list(userId: string, isTrash: boolean) {
    const deletedOpt = isTrash ? { not: null } : null
    const userTemplate = await prisma.userTemplate.findMany({
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

    const templates = this.transformTemplateOutput(userTemplate)

    return templates
  }

  async update({ id, ...restUpdate }: UpdateTemplateInputType, user: User) {
    await this.validateUserTemplateDeleted(id, user.id)

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

  async like({ id, is_favorite }: LikeTemplateInputType, user: User) {
    const UserTemplate = await this.validateUserTemplateDeleted(id, user.id)

    const likeTemplate = await prisma.userTemplate.update({
      where: { id: UserTemplate.id },
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
    const userTemplate = await prisma.userTemplate.findFirst({
      where: {
        template_id: id,
        user_id: user.id,
      },
    })

    if (!userTemplate) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.unauthorized',
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

  async byId(template_id: string, user: User) {
    const userTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id,
      },
      include: {
        template: true,
      },
    })

    if (!userTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    const { template } = userTemplate

    const templateData: TemplateType = {
      template_id: userTemplate.template_id,
      can_edit: userTemplate.can_edit,
      is_favorite: userTemplate.is_favorite,
      is_owner: userTemplate.is_owner,
      ...template,
    }

    return templateData
  }

  async exists(template_id: string, user: User) {
    const userTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id: user.id,
        template_id,
      },
    })

    return !!userTemplate
  }

  async favorite(user: User) {
    const userTemplate = await prisma.userTemplate.findMany({
      where: {
        user_id: user.id,
        is_favorite: true,
        template: {
          deleted_at: null,
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

    const templateData = this.transformTemplateOutput(userTemplate)

    return templateData
  }

  async search({ name }: SearchTemplateInputType, userId: string) {
    const result = await prisma.userTemplate.findMany({
      where: {
        user_id: userId,
        template: {
          name: {
            contains: name,
          },
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

    const templateData = this.transformTemplateOutput(result)

    return templateData
  }
}
