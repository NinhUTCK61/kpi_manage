import { z } from 'zod'

export const NonEmptyPassword = z.string().min(1, {
  message: 'error.message_password',
})

export const NonEmptyStringLabel = z.string().trim().min(1, {
  message: 'error.invalid_string_label',
})

export const PreSignUrlInputSchema = z.object({
  key: z.string(),
})

export const PreSignUrlOutputSchema = z.object({
  url: z.string(),
  expires: z.number(),
  key: z.string(),
})
