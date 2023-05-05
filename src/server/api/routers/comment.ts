import {
  CreateCommentReplySchema,
  CreateCommentSchema,
  InputCommentReplySchema,
  InputCommentSchema,
  InputUpdateCommentReplySchema,
  InputUpdateCommentSchema,
} from '@/libs/schema/comment'
import { User } from 'prisma/generated/zod'
import { CommentService } from '../services/comment.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const commentService = new CommentService()

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment' } })
    .input(InputCommentSchema)
    .output(CreateCommentSchema)
    .mutation(({ input, ctx }) => {
      return commentService.create(input, ctx.session?.user as User)
    }),
  createReply: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment-reply' } })
    .input(InputCommentReplySchema)
    .output(CreateCommentReplySchema)
    .mutation(({ input, ctx }) => {
      return commentService.createReply(input, ctx.session?.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment' } })
    .input(InputUpdateCommentSchema)
    .output(CreateCommentSchema)
    .mutation(({ input, ctx }) => {
      return commentService.update(input, ctx.session.user as User)
    }),
  updateReply: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment' } })
    .input(InputUpdateCommentReplySchema)
    .output(CreateCommentReplySchema)
    .mutation(({ input, ctx }) => {
      return commentService.updateReply(input, ctx.session.user as User)
    }),
})
