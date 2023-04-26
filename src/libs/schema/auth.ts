import { z } from 'zod'
import { NonEmptyString } from './utils'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: NonEmptyString,
})

export const ForgotPasswordSchemaInput = z.object({
  email: z.string().email(),
})

export type SignInType = z.infer<typeof LoginSchema>
export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchemaInput>

const uppercaseRegex = /[A-Z]/
const lowercaseRegex = /[a-z]/
const numberRegex = /[0-9]/
const specialCharRegex = /[!@#$%^&*()_+]/

export const passwordPolicySchema = z
  .string()
  .min(8, 'password_err_min')
  .regex(specialCharRegex, 'password_err_special')
  .regex(uppercaseRegex, 'password_err_upper')
  .regex(lowercaseRegex, 'password_err_lower')
  .regex(numberRegex, 'password_err_number')

export const SignUpSchemaInput = z.object({
  first_name: z.string().max(255).min(1),
  last_name: z.string().max(255).min(1),
  email: z.string().email(),
  password: passwordPolicySchema,
  company_name: z.string().max(255).min(1),
  role_in_company: z.string().max(255).min(1),
  date_of_birth: z.string().datetime().nullable(),
  reasons: z.array(z.number()),
})

export const ResetPasswordSchemaInput = z
  .object({
    password: passwordPolicySchema,
    confirmPassword: passwordPolicySchema,
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ResetPasswordType = z.infer<typeof ResetPasswordSchemaInput>

export const ResendEmailVerify = z.object({
  email: z.string().email(),
})

export type ResendEmailVerifyType = z.infer<typeof ResendEmailVerify>
