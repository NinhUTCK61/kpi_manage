import { CommentReplySchema, CommentSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { UserWithoutPasswordSchema } from './auth'

export const CommentWithAuthorSchema = CommentSchema.merge(
  z.object({
    replies: z.array(CommentReplySchema.merge(z.object({ author: UserWithoutPasswordSchema }))),
    author: UserWithoutPasswordSchema,
  }),
)

export type CommentWithAuthorType = z.infer<typeof CommentWithAuthorSchema>

// Type Create Comment
export const CreateCommentInputSchema = CommentSchema.omit({
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type CreateCommentInputType = z.infer<typeof CreateCommentInputSchema>

export const CreateCommentOutputSchema = CommentSchema.merge(
  z.object({
    author: UserWithoutPasswordSchema,
    replies: z.array(CommentReplySchema.merge(z.object({ author: UserWithoutPasswordSchema }))),
  }),
)

export type CreateCommentOutputType = z.infer<typeof CreateCommentOutputSchema>

// Type Create Comment Reply

export const CreateCommentReplyInputSchema = CommentReplySchema.omit({
  created_at: true,
  updated_at: true,
  author_id: true,
})

export const CreateCommentRepliesOutputSchema = CommentReplySchema.merge(
  z.object({ author: UserWithoutPasswordSchema }),
)

export type CreateCommentRepliesOutputType = z.infer<typeof CreateCommentRepliesOutputSchema>

export type CreateCommentReplyInput = z.infer<typeof CreateCommentReplyInputSchema>

// Type Update Comment

export const UpdateCommentInputSchema = CreateCommentInputSchema.merge(
  z.object({
    id: z.string(),
  }),
).omit({ template_id: true })

export type UpdateCommentInputType = z.infer<typeof UpdateCommentInputSchema>

// Type Update Comment Reply

export const UpdateCommentRepliesInputSchema = CommentReplySchema.omit({
  created_at: true,
  updated_at: true,
  author_id: true,
  comment_id: true,
})

export type UpdateCommentReplyInputType = z.infer<typeof UpdateCommentRepliesInputSchema>
export type CommentOutputType = z.infer<typeof CreateCommentRepliesOutputSchema>

// Type Delete Comment

export const DeleteCommentInputSchema = z.object({
  id: z.string(),
})

export const DeleteCommentReplyInputSchema = z.object({
  id: z.string(),
  comment_id: z.string(),
})

export type DeleteCommentInputType = z.infer<typeof DeleteCommentInputSchema>
export type DeleteCommentReplyInputType = z.infer<typeof DeleteCommentReplyInputSchema>
