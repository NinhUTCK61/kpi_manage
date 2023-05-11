import {
  DeleteTemplateInputSchema,
  GetTemplateByIdInputSchema,
  LikeTemplateInputSchema,
  ListTemplateInputSchema,
  TemplateDataOutputSchema,
  TemplateDataSchema,
  UpdateTemplateInputSchema,
} from '@/libs/schema'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { TemplateSchema, UserTemplateSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { TemplateService } from '../services/template.service'

const templateService = new TemplateService()

export const templateRouter = createTRPCRouter({
  list: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/template', protect: true } })
    .input(ListTemplateInputSchema)
    .output(TemplateDataOutputSchema)
    .query(({ input, ctx }) => {
      return templateService.list(ctx.session.user.id, input.isTrash)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/template', protect: true } })
    .input(UpdateTemplateInputSchema)
    .output(TemplateSchema)
    .mutation(({ input, ctx }) => {
      return templateService.update(input, ctx.session.user)
    }),
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/template', protect: true } })
    .input(z.void())
    .output(TemplateSchema)
    .mutation(({ ctx }) => {
      return templateService.create(ctx.session.user.id)
    }),
  like: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/template/like', protect: true } })
    .input(LikeTemplateInputSchema)
    .output(UserTemplateSchema)
    .mutation(({ input, ctx }) => {
      return templateService.like(input, ctx.session.user)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/template', protect: true } })
    .input(DeleteTemplateInputSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return templateService.delete(input.id, input.is_permanently, ctx.session.user)
    }),
  restore: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/template-restore', protect: true } })
    .input(DeleteTemplateInputSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return templateService.restore(input.id, ctx.session.user)
    }),
  byId: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/template/{id}', protect: true } })
    .input(GetTemplateByIdInputSchema)
    .output(TemplateDataSchema)
    .query(({ input, ctx }) => {
      return templateService.byId(input.id, ctx.session.user)
    }),
  exists: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/template/{id}/exists', protect: true } })
    .input(GetTemplateByIdInputSchema)
    .output(z.boolean())
    .query(({ input, ctx }) => {
      return templateService.exists(input.id, ctx.session.user)
    }),
  favorite: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/template/favorite', protect: true } })
    .input(z.void())
    .output(TemplateDataOutputSchema)
    .query(({ ctx }) => {
      return templateService.favorite(ctx.session.user)
    }),
})
