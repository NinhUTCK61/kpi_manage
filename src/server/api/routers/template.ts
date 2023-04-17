import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { UserSchema, UserTemplateSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { TemplateService } from '../services/template.service'

const templateService = new TemplateService()

export const TemplateRouter = createTRPCRouter({
  getListTemplate: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/get-list-template' } })
    .input(z.object({ id: z.string() }))
    .output(UserSchema || UserTemplateSchema || z.string())
    .mutation(({ input }) => {
      return templateService.getListTemplate(input.id)
    }),

  updateTemplate: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/update-template' } })
    .input(
      z.object({
        name: z.string(),
        imageUrl: z.string(),
        id: z.string(),
      }),
    )
    .output(z.string())
    .mutation(({ input }) => {
      return templateService.updateTemplate(input.name, input.imageUrl, input.id)
    }),
})
