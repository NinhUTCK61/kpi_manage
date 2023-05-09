import { TemplateDataOutputSchema } from '@/libs/schema'
import { prisma } from '@/server/db'
import { Template, UserTemplate } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { CommonHelper } from './common.hepler'

export class TemplateHelper extends CommonHelper {
  transformTemplateOutput(
    listTemplate: (UserTemplate & {
      template: Template
    })[],
  ) {
    const templateData: z.infer<typeof TemplateDataOutputSchema> = []

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

    return templateData
  }

  async validateUserTemplateDeleted(template_id: string, user_id: string) {
    const UserTemplate = await prisma.userTemplate.findFirst({
      where: {
        user_id,
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

    return UserTemplate
  }
}
