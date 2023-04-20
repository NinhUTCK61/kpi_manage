import { NodeSchemaActive } from '@/libs/schema/node'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { Node } from 'prisma/generated/zod'
import { z } from 'zod'

type NodeCustome = z.infer<typeof NodeSchemaActive>
export class NodeService {
  async createNode(node: Node) {
    const isTemplate = await prisma.template.findFirst({
      where: {
        id: node.template_id,
      },
    })
    const newNode = await prisma.node.create({
      data: node,
    })

    if (newNode && isTemplate) {
      return newNode as NodeCustome
    } else if (!isTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    } else {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'error.invalid_server_error',
      })
    }
  }

  async deleteNode([...nodeIds], user: User) {
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

    if (validNodeCount.length !== nodeIds.length) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }

    await prisma.node.deleteMany({
      where: {
        id: {
          in: nodeIds,
        },
      },
    })

    return 'node.delete_success'
  }
}
