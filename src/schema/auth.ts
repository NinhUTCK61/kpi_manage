import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(120),
})

export type SignInType = z.infer<typeof LoginSchema>
