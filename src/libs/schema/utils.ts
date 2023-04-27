import { z } from 'zod'

export const NonEmptyString = z.string().refine((value) => value.trim() !== '', {
  message: 'This field must not be empty',
})

export const InputPresignUrlSchema = z.object({
  key: z.string(),
})
