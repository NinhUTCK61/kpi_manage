import { z } from 'zod'

export const CreateSpeechBallonInputSchema = z.object({
  template_id: z.string(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string(),
  stroke: z.string(),
})

export const UpdateSpeechBallonInputSchema = z.object({
  id: z.string(),
  node_id: z.string(),
  template_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string(),
  stroke: z.string(),
})

export type CreateSpeechBallonType = z.infer<typeof CreateSpeechBallonInputSchema>
export type UpdateSpeechBallonType = z.infer<typeof UpdateSpeechBallonInputSchema>
