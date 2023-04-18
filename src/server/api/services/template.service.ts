import { UpdateTemplateSchema } from '@/libs/schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
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

  async updateTemplate({ id, ...restUpdate }: z.infer<typeof UpdateTemplateSchema>) {
    const checkTemplate = await prisma.template.findUnique({
      where: { id },
    })

    if (!checkTemplate) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Template not found!',
      })
    }

    const updateData = await prisma.template.update({
      where: { id },
      data: restUpdate,
    })

    return updateData
  }
}
