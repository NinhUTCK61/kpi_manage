import { z } from 'zod'

export const DeleteNodeSchema = z.object({
  id: z.string().array(),
  template_id: z.string(),
})
