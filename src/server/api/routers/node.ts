import { NodeSchemaActive } from '@/libs/schema/node'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { Node } from 'prisma/generated/zod'
import NodeService from '../services/node'

const node = new NodeService()

export const nodeRouter = createTRPCRouter({
  createNode: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/create-node' } })
    .input(NodeSchemaActive)
    .output(NodeSchemaActive)
    .mutation(({ input }) => {
      return node.createNode(input as Node)
    }),
})
