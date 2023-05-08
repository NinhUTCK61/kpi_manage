import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { NonEmptyString } from './utils'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: NonEmptyString,
})

export const ForgotPasswordInputSchema = z.object({
  email: z.string().email(),
})

export type SignInType = z.infer<typeof LoginSchema>
export type ForgotPasswordType = z.infer<typeof ForgotPasswordInputSchema>

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

export const SignUpInputSchema = z
  .object({
    first_name: z.string().max(255).min(1),
    last_name: z.string().max(255).min(1),
    email: z.string().email(),
    password: passwordPolicySchema,
    company_name: z.string().min(1),
    role_in_company: z.string().min(1),
    date_of_birth: z.string().datetime().nullable(),
    reasons: z.array(z.number()),
  })
  .refine(
    (data) => {
      if (!data.date_of_birth) return true
      const now = new Date()
      const dob = new Date(data.date_of_birth as string)
      return dob < now
    },
    {
      message: 'error.dob_invalid',
      path: ['date_of_birth'],
    },
  )

export type SignUpInputType = z.infer<typeof SignUpInputSchema>

export const SignUpSchemaForm = z
  .intersection(
    SignUpInputSchema,
    z.object({
      reenter_password: passwordPolicySchema,
    }),
  )
  .refine((data) => data.password === data.reenter_password, {
    message: 'error.error_match_password',
    path: ['reenter_password'],
  })

export type SignUpFormType = z.infer<typeof SignUpSchemaForm>

export const ResetPasswordInputSchema = z
  .object({
    password: passwordPolicySchema,
    confirmPassword: passwordPolicySchema,
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'error.error_match_password',
    path: ['confirmPassword'],
  })

export type ResetPasswordType = z.infer<typeof ResetPasswordInputSchema>

export const ResendEmailVerify = z.object({
  email: z.string().email(),
})

export type ResendEmailVerifyType = z.infer<typeof ResendEmailVerify>

export const UserWithoutPasswordSchema = UserSchema.omit({
  password: true,
})
