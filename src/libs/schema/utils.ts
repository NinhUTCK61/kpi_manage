import { z } from 'zod'

export const NonEmptyString = z.string().refine((value) => value.trim() !== '', {
  message: 'error.invalid_string_email',
})

export const PreSignUrlInputSchema = z.object({
  key: z.string(),
})

export const PreSignUrlOutputSchema = z.object({
  url: z.string(),
  expires: z.number(),
  key: z.string(),
})
