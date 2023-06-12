import { SpeechBallonSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const CreateSpeechBallonInputSchema = SpeechBallonSchema.omit({
  created_at: true,
  updated_at: true,
})

export const UpdateSpeechInputSchema = SpeechBallonSchema.partial().required({
  id: true,
})

export const DeleteSpeechInputSchema = z.object({
  id: z.string(),
})

export type CreateSpeechBallonInputType = z.infer<typeof CreateSpeechBallonInputSchema>
export type UpdateSpeechBallonInputType = z.infer<typeof UpdateSpeechInputSchema>
export type DeleteSpeechBallonInputType = z.infer<typeof DeleteSpeechInputSchema>
