import { InputPreSignUrlInputSchema } from '@/libs/schema'
import { z } from 'zod'
import { UtilsService } from '../services/utils.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const utilsService = new UtilsService()

export const utilsRouter = createTRPCRouter({
  createPreSignUrl: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/upload-image', protect: true } })
    .input(InputPreSignUrlInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return utilsService.createPreSignedUrl(input.key)
    }),
})
