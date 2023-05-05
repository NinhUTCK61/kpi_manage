import { z } from 'zod'
import { SpeechBallonService } from '../services/speechballon.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const speechBallonService = new SpeechBallonService()
export const speechBallonRoute = createTRPCRouter({
  create: protectedProcedure
    .meta({
      openapi: { method: 'POST', path: '/speechballon', protect: true },
    })
    .input(
      z.object({
        template_id: z.string(),
      }),
    )
    .output(z.any())
    .mutation(({ input }) => {
      return speechBallonService.create(input.template_id)
    }),
})
