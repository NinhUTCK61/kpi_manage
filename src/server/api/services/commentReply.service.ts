import { CreateCommentReplyInput, UpdateCommentReplyInputType } from '@/libs/schema/comment'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { CommentService } from './comment.service'
import { CommentHelper } from './helper/comment.helper'

export class CommentReply extends CommentHelper {
  commentService: CommentService

  constructor() {
    super()
    this.commentService = new CommentService()
  }

  async create(commentRl: CreateCommentReplyInput, userId: string) {
    const comment = await this.commentService.byId(commentRl.comment_id)

    if (!comment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }

    await this.validateUserTemplate(comment.template_id, userId)

    const newComment = await prisma.commentReply.create({
      data: {
        author_id: userId,
        ...commentRl,
      },
      include: {
        author: true,
      },
    })

    return newComment
  }

  async update(commentRl: UpdateCommentReplyInputType, userId: string) {
    const oldComment = await this.byId(commentRl.id)

    if (!oldComment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }

    await this.validateUserTemplate(oldComment.comment.template_id, userId)

    const commentUpdate = await prisma.commentReply.update({
      where: {
        id: commentRl.id,
      },
      data: {
        ...commentRl,
        author_id: userId,
      },
      include: {
        author: true,
      },
    })

    return commentUpdate
  }

  async byId(id: string) {
    const comment = await prisma.commentReply.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        comment: true,
      },
    })

    return comment
  }
}
