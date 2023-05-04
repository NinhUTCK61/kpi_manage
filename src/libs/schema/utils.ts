import { z } from 'zod'

export const NonEmptyString = z.string().refine((value) => value.trim() !== '', {
  message: 'error.invalid_string_email',
})

export const InputPreSignUrlInputSchema = z.object({
  key: z.string(),
})
