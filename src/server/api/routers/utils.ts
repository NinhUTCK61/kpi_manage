import { PreSignUrlInputSchema, PreSignUrlOutputSchema } from '@/libs/schema'
import { z } from 'zod'
import { UtilsService } from '../services/utils.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const utilsService = new UtilsService()

export const utilsRouter = createTRPCRouter({
  createPreSignUrl: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/s3-presign-url', protect: true } })
    .input(PreSignUrlInputSchema)
    .output(PreSignUrlOutputSchema)
    .mutation(({ input }) => {
      return utilsService.createPreSignedUrl(input.key)
    }),

  deleteImage: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/s3-presign-url', protect: true } })
    .input(PreSignUrlInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return utilsService.deleteImage(input.key)
    }),
})
