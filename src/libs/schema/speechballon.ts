import { SpeechBallonSchema } from 'prisma/generated/zod'
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

export const UpdateSpeechInputSchema = SpeechBallonSchema.partial({
  node_id: true,
  template_id: true,
}).required({
  id: true,
})

export type CreateSpeechBallonInputType = z.infer<typeof CreateSpeechBallonInputSchema>
export type UpdateSpeechBallonInputType = z.infer<typeof UpdateSpeechInputSchema>
