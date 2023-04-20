import { DeleteNodeSchema } from '@/libs/schema/node'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import { NodeService } from '../services/node.service'

const nodeService = new NodeService()

export const nodeRouter = createTRPCRouter({
  deleteNode: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/node-delete' }, protect: true })
    .input(DeleteNodeSchema)
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return nodeService.deleteNode(input.id, ctx.session.user)
    }),
})
