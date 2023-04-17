import { z } from 'zod'

export const UpdateTemplateSchema = z.object({
  name: z.string().min(8).max(255).optional(),
  imageUrl: z.string().optional(),
  id: z.string(),
})
