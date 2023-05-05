import {
  CreateCommentInputType,
  CreateCommentRepliesInput,
  CreateCommentRepliesWithoutPasswordOutputType,
  CreateCommentWithoutPasswordOutputType,
  UpdateCommentInputType,
  UpdateCommentReplyInputType,
} from '@/libs/schema/comment'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'

export class CommentService {
  async create(comment: CreateCommentInputType, userId: string) {
    const itemTemplate = await prisma.template.findFirst({
      where: {
        id: comment.template_id,
      },
    })

    if (itemTemplate) {
      const newComment = await prisma.comment.create({
        data: {
          ...comment,
          author_id: userId,
        },
        include: {
          author: true,
        },
      })
      return newComment as CreateCommentWithoutPasswordOutputType
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  async createReply(commentRl: CreateCommentRepliesInput, userId: string) {
    const itemTemplate = await prisma.comment.findFirst({
      where: {
        id: commentRl.comment_id,
      },
    })

    if (itemTemplate) {
      const newComment = await prisma.commentReply.create({
        data: {
          author_id: userId,
          ...commentRl,
        },
        include: {
          author: true,
        },
      })
      return newComment as CreateCommentRepliesWithoutPasswordOutputType
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.template_not_found',
      })
    }
  }

  async update(comment: UpdateCommentInputType, userId: string) {
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
      },
    })

    return commentUpdate as CreateCommentWithoutPasswordOutputType
  }

  async updateReply(commentRl: UpdateCommentReplyInputType, userId: string) {
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
    return commentUpdate as CreateCommentRepliesWithoutPasswordOutputType
  }
}
