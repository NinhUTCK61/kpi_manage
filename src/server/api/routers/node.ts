import {
  CreateNodeInputSchema,
  DeleteNodeInputSchema,
  GetListNodeInputSchema,
  KpiNodeSchema,
  ReactFlowSchema,
} from '@/libs/schema/node'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { NodeSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { NodeService } from '../services/node.service'

const nodeService = new NodeService()

export const nodeRouter = createTRPCRouter({
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/node' } })
    .input(CreateNodeInputSchema)
    .output(KpiNodeSchema)
    .mutation(({ input, ctx: { session } }) => {
      return nodeService.create(input, session.user)
    }),
  updateMultiple: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/node' } })
    .input(NodeSchema.array())
    .output(NodeSchema.array() || z.string())
    .mutation(({ input, ctx: { session } }) => {
      return nodeService.update(input, session.user)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/node' }, protect: true })
    .input(DeleteNodeInputSchema)
    .output(z.string())
    .mutation(({ input, ctx: { session } }) => {
      return nodeService.delete(input.id, session.user)
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
