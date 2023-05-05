import {
  CreateCommentReplyType,
  CreateCommentType,
  InputComment,
  InputCommentReplyType,
  InputUpdateCommentReplyType,
  InputUpdateCommentType,
} from '@/libs/schema/comment'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'prisma/generated/zod'

export class CommentService {
  async create(comment: InputComment, user: User) {
    const itemTemplate = await prisma.template.findFirst({
      where: {
        id: comment.template_id,
      },
    })

    if (itemTemplate) {
      const newComment = await prisma.comment.create({
        data: {
          author_id: user.id,
          ...comment,
        },
      })
      const { created_at, updated_at, password, id, ...userRest } = user
      return { ...newComment, ...userRest } as CreateCommentType
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  async createReply(commentRl: InputCommentReplyType, user: User) {
    const itemTemplate = await prisma.comment.findFirst({
      where: {
        id: commentRl.comment_id,
      },
    })

    if (itemTemplate) {
      const newComment = await prisma.commentReply.create({
        data: {
          author_id: user.id,
          ...commentRl,
        },
      })
      const { created_at, updated_at, password, id, ...userRest } = user
      return { ...newComment, ...userRest } as CreateCommentReplyType
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  async update(comment: InputUpdateCommentType, user: User) {
    const commentUpdate = await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        ...comment,
      },
    })

    const { created_at, updated_at, password, id, ...userRest } = user
    return { ...commentUpdate, ...userRest }
  }

  async updateReply(commentRl: InputUpdateCommentReplyType, user: User) {
    const itemTemplate = await prisma.comment.findFirst({
      where: {
        id: commentRl.comment_id,
      },
    })

    if (itemTemplate) {
      const commentUpdate = await prisma.commentReply.update({
        where: {
          id: commentRl.id,
        },
        data: {
          ...commentRl,
        },
      })
      const { created_at, updated_at, password, id, ...userRest } = user
      return { ...commentUpdate, ...userRest }
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }
}
