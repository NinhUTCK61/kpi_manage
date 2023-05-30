import { CreateCommentInputType, UpdateCommentInputType } from '@/libs/schema/comment'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { CommentHelper } from './helper/comment.helper'

export class CommentService extends CommentHelper {
  async create(comment: CreateCommentInputType, userId: string) {
    await this.validateUserTemplate(comment.template_id, userId)

    const newComment = await prisma.comment.create({
      data: {
        ...comment,
        author_id: userId,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    })

    return newComment
  }

  async update(comment: UpdateCommentInputType, userId: string) {
    const oldComment = await this.byId(comment.id)

    if (!oldComment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }

    await this.validateUserTemplate(oldComment.template_id, userId)

    const commentUpdate = await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        ...comment,
        author_id: userId,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    })

    return commentUpdate
  }

  async byId(id: string) {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    })

    return comment
  }

  async byIdWithReplies(id: string) {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    })

    return comment
  }

  async delete(id: string, author_id: string) {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
        author_id,
      },
    })

    if (!comment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.comment_not_found',
      })
    }

    await prisma.comment.delete({
      where: { id },
    })

    return 'comment.delete_comment'
  }
}
