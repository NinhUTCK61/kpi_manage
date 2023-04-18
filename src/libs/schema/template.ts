import { z } from 'zod'

export const UpdateTemplateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  image_url: z.string().optional(),
  id: z.string(),
})
