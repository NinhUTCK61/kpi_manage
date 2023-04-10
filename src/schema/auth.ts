import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().max(255),
})
