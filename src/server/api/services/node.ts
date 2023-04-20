import { NodeSchemaActive } from '@/libs/schema/node'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { Node } from 'prisma/generated/zod'
import { z } from 'zod'

type NodeCustome = z.infer<typeof NodeSchemaActive>
class NodeService {
  async createNode(node: Node) {
    const isTemplate = await prisma.template.findFirst({
      where: {
        id: node.template_id,
      },
    })
    const newNode = await prisma.node.create({
      data: node,
    })
    console.log(isTemplate, newNode, 'ninhtran9234242')
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
}

export default NodeService
