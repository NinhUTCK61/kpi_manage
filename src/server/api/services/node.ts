import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { Node } from 'prisma/generated/zod'

class NodeService {
  async createNode(node: Node) {
    const isTemplate = await prisma.template.findUnique({
      where: {
        id: node.template_id,
      },
    })
    const newNode = await prisma.node.create({
      data: node,
    })
    console.log(isTemplate, newNode, 'ninhtran9234242')
    if (newNode && isTemplate) {
      return newNode
    } else if (!isTemplate) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.invalid_server_error',
      })
    }
  }
}

export default NodeService
