import { DeleteNodeSchema, GetListNodes, KpiNodeSchema, ReactFlowSchema } from '@/libs/schema/node'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { Node, NodeSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { NodeService } from '../services/node.service'

const nodeService = new NodeService()

export const nodeRouter = createTRPCRouter({
  createNode: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/node' } })
    .input(NodeSchema.omit({ id: true }))
    .output(KpiNodeSchema)
    .mutation(({ input }) => {
      return nodeService.createNode(input as Node)
    }),
  deleteNode: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/node' }, protect: true })
    .input(DeleteNodeSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return nodeService.deleteNode(input.id, ctx.session.user)
    }),
  getListNodes: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/get-list-nodes' }, protect: true })
    .input(GetListNodes)
    .output(ReactFlowSchema)
    .query(({ input, ctx }) => {
      return nodeService.getListNodes(
        input.template_id,
        input.root_node_id,
        ctx.session.user,
      ) as unknown as z.infer<typeof ReactFlowSchema>
    }),
})
