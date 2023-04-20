import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'

export class NodeService {
  async deleteNode([...nodeIds], template_id: string, user: User) {
    const validNodeCount = await prisma.node.findMany({
      where: {
        id: { in: nodeIds },
        Template: {
          userTemplate: {
            some: {
              user_id: user.id,
            },
          },
        },
      },
      select: {
        id: true,
      },
    })

    // Kiểm tra xem tất cả các Node có hợp lệ không
    if (validNodeCount.length !== nodeIds.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    await prisma.node.deleteMany({
      where: {
        template_id,
        id: {
          in: nodeIds,
        },
      },
    })

    return 'Delete succcess!'
  }
}
