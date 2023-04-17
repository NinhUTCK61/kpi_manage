import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
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

  async updateTemplate(imageUrl: string, name: string, id: string) {
    let updates = {}

    if (imageUrl) {
      updates = { ...updates, image_url: imageUrl }
    }

    if (name) {
      updates = { ...updates, name: name }
    }

    console.log(updates)

    await prisma.template.update({
      where: { id },
      data: updates,
    })

    return 'ok!'
  }
}
