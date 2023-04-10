import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email().max(50),
  password: z.string().min(8).max(120),
})

export type SignInType = z.infer<typeof LoginSchema>

const uppercaseRegex = /[A-Z]/
const lowercaseRegex = /[a-z]/
const numberRegex = /[0-9]/
const specialCharRegex = /[!@#$%^&*()_+]/

export const SignUpSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address!',
  }),
  password: z
    .string()
    .min(8, 'Minimum length of 8 characters')
    .regex(specialCharRegex, 'Must include at least one special character (!,@,#,$,%,^,&,*,(,))')
    .regex(uppercaseRegex, 'Must include at least one uppercase letter')
    .regex(lowercaseRegex, 'Must include at least one lowercase letter')
    .regex(numberRegex, 'Must include at least one number'),
  name: z.string().max(255),
})