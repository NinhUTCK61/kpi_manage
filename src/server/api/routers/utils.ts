import { InputPresignUrlSchema } from '@/libs/schema'
import { z } from 'zod'
import { UtilsService } from '../services/utils.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const utilsService = new UtilsService()
export const utilsRouter = createTRPCRouter({
  createPresignUrl: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/upload-image', protect: true } })
    .input(InputPresignUrlSchema)
    .output(z.string())
    .query(({ input }) => {
      return utilsService.createPresignedUrl(input.key)
    }),
})
