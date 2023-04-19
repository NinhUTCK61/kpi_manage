import { z } from 'zod'

export const UpdateTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255).optional(),
  image_url: z.string().optional(),
})

export const likeTemplateSchema = z.object({
  id: z.string(),
  isFavorite: z.boolean(),
})
