import { CreateSpeechBallonInputSchema, UpdateSpeechInputSchema } from '@/libs/schema/speechballon'
import { SpeechBallonSchema } from 'prisma/generated/zod'
import { SpeechBallonService } from '../services/speechballon.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const speechBallonService = new SpeechBallonService()
export const speechBallonRoute = createTRPCRouter({
  create: protectedProcedure
    .meta({
      openapi: { method: 'POST', path: '/create', protect: true },
    })
    .input(CreateSpeechBallonInputSchema)
    .output(SpeechBallonSchema)
    .mutation(({ input, ctx }) => {
      return speechBallonService.create(ctx.session.user, input)
    }),
  update: protectedProcedure
    .meta({
      openapi: { method: 'PUT', path: '/update', protect: true },
    })
    .input(UpdateSpeechInputSchema)
    .output(SpeechBallonSchema)
    .mutation(({ input, ctx }) => {
      return speechBallonService.update(ctx.session.user, input)
    }),
})
