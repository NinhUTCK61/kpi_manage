import { TemplateOutputType, UserTemplateType } from '@/libs/schema'
import { prisma } from '@/server/db'
import { Prisma } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { CommonHelper } from './common.hepler'

export class TemplateHelper extends CommonHelper {
  transformTemplateOutput(listTemplate: UserTemplateType[]) {
    const templateData: TemplateOutputType = []
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

  async handleSearchTemplate(searchName: string, userId: string, isTrash: boolean) {
    const isDeleted = isTrash
      ? Prisma.sql`tl.deleted_at IS NOT NULL`
      : Prisma.sql`tl.deleted_at IS NULL`

    await prisma.$executeRaw`SET pg_bigm.similarity_limit TO 0.07`
    const resultTemplates: TemplateOutputType = await prisma.$queryRaw`SELECT *
      FROM "UserTemplate" as ut
      INNER JOIN "Template" as tl ON ut.template_id = tl.id
      WHERE ut.user_id = ${userId} AND normalize(name, NFKC) =% normalize(${searchName}, NFKC) AND ${isDeleted}`

    return resultTemplates
  }
}
