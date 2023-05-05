import { CommentReplySchema, CommentSchema, UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

// Type Create Comment
export const CreateCommentInputSchema = CommentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type CreateCommentInputType = z.infer<typeof CreateCommentInputSchema>

export const CreateCommentWithoutPasswordOutput = CommentSchema.merge(
  z.object({ author: UserSchema.omit({ password: true }) }),
)

export type CreateCommentWithoutPasswordOutputType = z.infer<
  typeof CreateCommentWithoutPasswordOutput
>

// Type Create Comment Reply

export const CreateCommentRepliesInputSchema = CommentReplySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  author_id: true,
})

export const CreateCommentRepliesWithoutPasswordOutput = CommentReplySchema.merge(
  z.object({ author: UserSchema.omit({ password: true }) }),
)

export type CreateCommentRepliesWithoutPasswordOutputType = z.infer<
  typeof CreateCommentRepliesWithoutPasswordOutput
>

export type CreateCommentRepliesInput = z.infer<typeof CreateCommentRepliesInputSchema>

// Type Update Comment

export const UpdateCommentInputSchema = CreateCommentInputSchema.merge(
  z.object({
    id: z.string().cuid(),
  }),
)
export type UpdateCommentInputType = z.infer<typeof UpdateCommentInputSchema>

// Type Update Comment Reply

export const UpdateCommentRepliesInputSchema = CommentReplySchema.omit({
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type UpdateCommentReplyInputType = z.infer<typeof UpdateCommentRepliesInputSchema>
