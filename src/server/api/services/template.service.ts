import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { Template } from 'prisma/generated/zod'

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

  async updateTemplate(name: string, imageUrl: string, id: string) {
    const checkTemplate = await prisma.template.findUnique({
      where: { id },
    })

    if (!checkTemplate) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Template not found!',
      })
    }

    const updates = {
      ...(imageUrl && { image_url: imageUrl }),
      ...(name && { name }),
    }

    const updateData: Template = await prisma.template.update({
      where: { id },
      data: updates,
    })

    return updateData
  }
}
