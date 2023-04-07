import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { sendMail } from '@/utils/sendmail'
import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      return user
    }),
  forgotPassword: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
        include: {
          PasswordReset: true,
        },
      })
      const token = nanoid()
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found!',
        })
      }

      const send = sendMail(input.email, token)
      const hasToken = user.PasswordReset && user.PasswordReset.token !== null
      if (send === undefined) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Send mail fail!',
        })
      }

      if (hasToken) {
        await prisma.passwordReset.update({
          where: {
            user_id: user.id,
          },
          data: {
            token,
          },
        })
      } else {
        await prisma.passwordReset.create({
          data: {
            user_id: user.id,
            token,
          },
        })
      }

      return user
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
