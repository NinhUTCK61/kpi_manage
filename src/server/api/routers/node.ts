import {
  DeleteNodeInputSchema,
  GetListNodeInputSchema,
  KpiNodeSchema,
  NodeInputSchema,
  ReactFlowSchema,
} from '@/libs/schema/node'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { Node, NodeSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { NodeService } from '../services/node.service'

const nodeService = new NodeService()

export const nodeRouter = createTRPCRouter({
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/node' } })
    .input(NodeSchema.omit({ id: true }))
    .output(KpiNodeSchema)
    .mutation(({ input }) => {
      return nodeService.create(input as Node)
    }),
  updateMultiple: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/node' } })
    .input(NodeInputSchema.array())
    .output(NodeSchema.array() || z.string())
    .mutation(({ input }) => {
      return nodeService.update(input)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/node' }, protect: true })
    .input(DeleteNodeInputSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return nodeService.delete(input.id, ctx.session.user)
    }),
  list: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/nodes' }, protect: true })
    .input(GetListNodeInputSchema)
    .output(ReactFlowSchema)
    .query(({ input, ctx }) => {
      return nodeService.list(input.template_id, ctx.session.user) as unknown as z.infer<
        typeof ReactFlowSchema
      >
    }),
  searchSlug: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/nodes' }, protect: true })
    .input(NodeSchema.pick({ template_id: true, slug: true }))
    .output(NodeSchema.array())
    .query(({ input }) => {
      return nodeService.searchSlug(input.template_id, input.slug)
    }),
})
