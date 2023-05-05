import {
  CreateCommentInputSchema,
  CreateCommentRepliesInputSchema,
  CreateCommentRepliesWithoutPasswordOutput,
  CreateCommentWithoutPasswordOutput,
  UpdateCommentInputSchema,
  UpdateCommentRepliesInputSchema,
} from '@/libs/schema/comment'

import { CommentService } from '../services/comment.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const commentService = new CommentService()

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment' } })
    .input(CreateCommentInputSchema)
    .output(CreateCommentWithoutPasswordOutput)
    .mutation(({ input, ctx }) => {
      return commentService.create(input, ctx.session.user.id)
    }),
  createReply: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment-reply' } })
    .input(CreateCommentRepliesInputSchema)
    .output(CreateCommentRepliesWithoutPasswordOutput)
    .mutation(({ input, ctx }) => {
      return commentService.createReply(input, ctx.session.user.id)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment' } })
    .input(UpdateCommentInputSchema)
    .output(CreateCommentWithoutPasswordOutput)
    .mutation(({ input, ctx }) => {
      return commentService.update(input, ctx.session.user.id)
    }),
  updateReply: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment-reply' } })
    .input(UpdateCommentRepliesInputSchema)
    .output(CreateCommentRepliesWithoutPasswordOutput)
    .mutation(({ input, ctx }) => {
      return commentService.updateReply(input, ctx.session.user.id)
    }),
})
