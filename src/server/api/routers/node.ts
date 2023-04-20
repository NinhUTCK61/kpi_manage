import { DeleteNodeSchema, NodeSchemaActive } from '@/libs/schema/node'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { Node } from 'prisma/generated/zod'
import { z } from 'zod'
import { NodeService } from '../services/node.service'

const nodeService = new NodeService()

export const nodeRouter = createTRPCRouter({
  createNode: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/create-node' } })
    .input(NodeSchemaActive)
    .output(NodeSchemaActive)
    .mutation(({ input }) => {
      return nodeService.createNode(input as Node)
    }),
  deleteNode: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/node-delete' }, protect: true })
    .input(DeleteNodeSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return nodeService.deleteNode(input.id, ctx.session.user)
    }),
})
