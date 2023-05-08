import {
  CreateCommentInputSchema,
  CreateCommentOutputSchema,
  CreateCommentRepliesOutputSchema,
  CreateCommentReplyInputSchema,
  UpdateCommentInputSchema,
  UpdateCommentRepliesInputSchema,
} from '@/libs/schema/comment'

import { CommentService } from '../services/comment.service'
import { CommentReply } from '../services/commentReply.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const commentService = new CommentService()
const commentReplyService = new CommentReply()

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment' } })
    .input(CreateCommentInputSchema)
    .output(CreateCommentOutputSchema)
    .mutation(({ input, ctx }) => {
      return commentService.create(input, ctx.session.user.id)
    }),
  createReply: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/comment-reply' } })
    .input(CreateCommentReplyInputSchema)
    .output(CreateCommentRepliesOutputSchema)
    .mutation(({ input, ctx }) => {
      return commentReplyService.create(input, ctx.session.user.id)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment' } })
    .input(UpdateCommentInputSchema)
    .output(CreateCommentOutputSchema)
    .mutation(({ input, ctx }) => {
      return commentService.update(input, ctx.session.user.id)
    }),
  updateReply: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/comment-reply' } })
    .input(UpdateCommentRepliesInputSchema)
    .output(CreateCommentRepliesOutputSchema)
    .mutation(({ input, ctx }) => {
      return commentReplyService.update(input, ctx.session.user.id)
    }),
})