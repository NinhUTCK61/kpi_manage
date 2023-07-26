import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { NonEmptyPassword } from './utils'

const regExpEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export const emailPolicySchema = z
  .string()
  .min(1, { message: 'error.message_email' })
  .regex(regExpEmail, { message: 'error.invalid_string_email' })

export const LoginSchema = z.object({
  email: emailPolicySchema,
  password: NonEmptyPassword,
})

export const ForgotPasswordInputSchema = z.object({
  email: emailPolicySchema,
  language: z.enum(['en', 'jp']).default('jp'),
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
    first_name: z.string().max(255).trim().min(1),
    last_name: z.string().max(255).trim().min(1),
    email: emailPolicySchema,
    password: passwordPolicySchema,
    company_name: z.string().min(1),
    role_in_company: z.string().min(1),
    date_of_birth: z.string().datetime().nullable(),
    reasons: z.array(z.number()),
    language: z.enum(['en', 'jp']).default('jp'),
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
    confirmPassword: passwordPolicySchema.default(''),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'error.error_match_password',
    path: ['confirmPassword'],
  })

export type ResetPasswordType = z.infer<typeof ResetPasswordInputSchema>

export const ResendEmailVerify = z.object({
  email: emailPolicySchema,
})

export type ResendEmailVerifyType = z.infer<typeof ResendEmailVerify>

export const UserWithoutPasswordSchema = UserSchema.omit({
  password: true,
})

export const ChangePasswordInputSchema = z
  .object({
    'old-password': z.string().trim().min(1),
    'new-password': passwordPolicySchema,
    'confirm-new-password': passwordPolicySchema,
  })
  .refine((data) => data['old-password'] !== data['new-password'], {
    message: 'error.same_password',
    path: ['new-password'],
  })
  .refine((data) => data['new-password'] === data['confirm-new-password'], {
    message: 'error.match_new_password',
    path: ['confirm-new-password'],
  })

export type ChangePasswordType = z.infer<typeof ChangePasswordInputSchema>
