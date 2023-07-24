import {
  ChangePasswordInputSchema,
  ForgotPasswordInputSchema,
  ResetPasswordInputSchema,
  SignUpInputSchema,
} from '@/libs/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/forgot-password' } })
    .input(ForgotPasswordInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email, input.language)
    }),
  signUp: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sign-up' } })
    .input(SignUpInputSchema)
    .output(UserSchema.omit({ password: true }) || z.string())
    .mutation(({ input }) => {
      return authService.signUp(input)
    }),
  resetPassword: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/reset-password' } })
    .input(ResetPasswordInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.resetPassword(input.password, input.token)
    }),
  verify: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/verify' } })
    .input(z.object({ token: z.string() }))
    .output(z.string())
    .mutation(({ input }) => {
      return authService.verify(input.token)
    }),
  resendVerifyEmail: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/resend-email' } })
    .input(z.object({ email: z.string().email(), language: z.enum(['en', 'jp']).default('jp') }))
    .output(z.string())
    .mutation(({ input }) => {
      return authService.resendVerifyEmail(input.email, input.language)
    }),
  changePassword: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/change-password' } })
    .input(ChangePasswordInputSchema)
    .output(UserSchema)
    .mutation(({ input, ctx }) => {
      return authService.changePassword(
        input['old-password'],
        input['new-password'],
        ctx.session.user.id,
      )
    }),
})
