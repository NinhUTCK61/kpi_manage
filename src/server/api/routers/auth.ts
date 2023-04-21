import {
  ForgotPasswordSchemaInput,
  ResetPasswordSchemaInput,
  SignUpSchemaInput,
} from '@/libs/schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/forgot-password' } })
    .input(ForgotPasswordSchemaInput)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email)
    }),
  signUp: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sign-up' } })
    .input(SignUpSchemaInput)
    .output(UserSchema.omit({ password: true }) || z.string())
    .mutation(({ input }) => {
      return authService.signUp(input.email, input.password, input.name)
    }),
  resetPassword: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/reset-password' } })
    .input(ResetPasswordSchemaInput)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.resetPassword(input.password, input.token)
    }),
})
