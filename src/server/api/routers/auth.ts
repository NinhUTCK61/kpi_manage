import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/forgot-password' } })
    .input(z.object({ email: z.string().email() }))
    .output(z.string())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email)
    }),
  signUp: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/sign-up' } })
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      return user
    }),
})
