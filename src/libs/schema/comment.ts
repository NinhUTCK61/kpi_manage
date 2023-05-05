import { CommentReplySchema, CommentSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const InputCommentSchema = CommentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type InputComment = z.infer<typeof InputCommentSchema>

export const CreateCommentSchema = z.object({
  id: z.string(),
  content: z.string().nullable(),
  template_id: z.string(),
  author_id: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  image: z.string().nullable(),
})

export type CreateCommentType = z.infer<typeof CreateCommentSchema>

export const InputCommentReplySchema = CommentReplySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type InputCommentReplyType = z.infer<typeof InputCommentReplySchema>

export const CreateCommentReplySchema = CreateCommentSchema.omit({
  x: true,
  y: true,
  template_id: true,
})

export type CreateCommentReplyType = z.infer<typeof CreateCommentReplySchema>

export const InputUpdateCommentSchema = CommentSchema.pick({
  id: true,
  content: true,
  x: true,
  y: true,
})
export type InputUpdateCommentType = z.infer<typeof InputUpdateCommentSchema>

export const InputUpdateCommentReplySchema = CommentReplySchema.omit({
  created_at: true,
  updated_at: true,
  author_id: true,
})

export type InputUpdateCommentReplyType = z.infer<typeof InputUpdateCommentReplySchema>
