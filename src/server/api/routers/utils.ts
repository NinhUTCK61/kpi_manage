import { PreSignUrlInputSchema, PreSignUrlOutputSchema } from '@/libs/schema'
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
})
