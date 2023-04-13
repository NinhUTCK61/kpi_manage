import { ForgotPasswordSchema, ResetPasswordSchema, SignUpSchema } from '@/libs/schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/forgot-password' } })
    .input(ForgotPasswordSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email)
    }),
  signUp: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sign-up' } })
    .input(SignUpSchema)
    .output(UserSchema.omit({ password: true }) || z.string())
    .mutation(({ input }) => {
      return authService.signUp(input.email, input.password, input.name)
    }),
  resetPassword: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/reset-password' } })
    .input(ResetPasswordSchema)
    .output(z.string())
    .mutation(({ input }) => {
      try {
        const result = authService.resetPassword(input.password, input.token)
        return result
      } catch (err) {
        console.error('Error occurred while processing input:', err)
        throw new Error('Error occurred while processing input')
      }
    }),
})
