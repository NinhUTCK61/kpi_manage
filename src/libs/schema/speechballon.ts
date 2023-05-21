import { SpeechBallonSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const CreateSpeechBallonInputSchema = z.object({
  template_id: z.string().min(1),
  node_id: z.string().min(1),
  text: z.string().min(1),
  x: z.number(),
  y: z.number(),
  shape: z.string().min(1),
  node_style: z.string().min(1),
  stroke: z.string().min(1),
  id: z.string().min(1),
})

export const UpdateSpeechInputSchema = SpeechBallonSchema.partial().required({
  id: true,
})

export type CreateSpeechBallonInputType = z.infer<typeof CreateSpeechBallonInputSchema>
export type UpdateSpeechBallonInputType = z.infer<typeof UpdateSpeechInputSchema>
