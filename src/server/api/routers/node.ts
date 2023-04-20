import { KpiNodeSchema } from '@/libs/schema/node'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { Node } from 'prisma/generated/zod'
import NodeService from '../services/node.service'

const node = new NodeService()

export const nodeRouter = createTRPCRouter({
  createNode: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/create-node' } })
    .input(KpiNodeSchema)
    .output(KpiNodeSchema)
    .mutation(({ input }) => {
      return node.createNode(input as Node)
    }),
})
