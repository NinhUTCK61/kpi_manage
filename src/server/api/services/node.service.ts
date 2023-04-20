import { KpiNodeSchema } from '@/libs/schema/node'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { Node } from 'prisma/generated/zod'
import { z } from 'zod'

type NodeCustome = z.infer<typeof KpiNodeSchema>
class NodeService {
  async createNode(node: Node) {
    const isTemplate = await prisma.template.findFirst({
      where: {
        id: node.template_id,
      },
    })

    if (isTemplate) {
      const newNode = await prisma.node.create({
        data: node,
      })
      return newNode as NodeCustome
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }
}

export default NodeService
