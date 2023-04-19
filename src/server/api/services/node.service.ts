import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'

export class NodeService {
  async deleteNode([...id], template_id: string, user: User) {
    const checkTemplate = await prisma.userTemplate.findFirst({
      where: {
        template_id,
        userId: user.id,
      },
    })

    if (!checkTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    const data = await prisma.node.deleteMany({
      where: {
        templateId: template_id,
        id: {
          in: id,
        },
      },
    })

    return data
  }
}
