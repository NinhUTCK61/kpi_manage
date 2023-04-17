import { z } from 'zod'

export const UpdateTemplateSchema = z.object({
  name: z.string().min(8).max(255),
  imageUrl: z.string(),
  id: z.string(),
})
