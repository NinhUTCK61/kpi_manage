import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { ReasonSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { ReasonService } from '../services/reason.service'

const reasonService = new ReasonService()

export const reasonRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.void())
    .output(z.array(ReasonSchema))
    .query(() => {
      return reasonService.getListReasons()
    }),
})
