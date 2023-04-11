import { ForgotPasswordSchema } from '@/schema'
import { SignUpSchema } from '@/schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/forgot-password' } })
    .input(ForgotPasswordSchema)
    .output(z.any())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email)
    }),
  signUp: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sign-up' } })
    .input(SignUpSchema)
    .output(UserSchema || z.string())
    .mutation(({ input }) => {
      return authService.signUp(input.email, input.password, input.name)
    }),
})
