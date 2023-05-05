import { z } from 'zod'

export const speechBallonSchema = z.object({
  template_id: z.string(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  style: z.string(),
  stroke: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
