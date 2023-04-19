import {
  DeleteTemplateSchema,
  InputGetListTemplate,
  TemplateDataOutputSchema,
  UpdateTemplateSchema,
  likeTemplateSchema,
} from '@/libs/schema'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { TemplateSchema, UserTemplateSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { TemplateService } from '../services/template.service'

const templateService = new TemplateService()

export const templateRouter = createTRPCRouter({
  getListTemplate: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/template', protect: true } })
    .input(InputGetListTemplate)
    .output(TemplateDataOutputSchema)
    .mutation(({ input, ctx }) => {
      return templateService.getListTemplate(ctx.session.user.id, input.isTrash)
    }),
  updateTemplate: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/template', protect: true } })
    .input(UpdateTemplateSchema)
    .output(TemplateSchema)
    .mutation(({ input, ctx }) => {
      return templateService.updateTemplate(input, ctx.session.user)
    }),
  createTemplate: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/template', protect: true } })
    .input(z.object({}))
    .output(TemplateSchema)
    .mutation(({ ctx }) => {
      return templateService.createTemplate(ctx.session.user.id)
    }),
  likeTemplate: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/like-template', protect: true } })
    .input(likeTemplateSchema)
    .output(UserTemplateSchema)
    .mutation(({ input, ctx }) => {
      return templateService.likeTemplate(input, ctx.session.user)
    }),
  deleteTemplate: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/template', protect: true } })
    .input(DeleteTemplateSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return templateService.deleteTemplate(input.id, input.is_permanently, ctx.session.user)
    }),
})
