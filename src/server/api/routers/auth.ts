import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import MailUtils from '@/utils/mail'
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
    .output(z.string())
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found!',
        })
      }

      const token = nanoid()
      const mailUtil = MailUtils.getInstance()

      await prisma.passwordReset.upsert({
        where: {
          user_id: user.id,
        },
        update: {
          token,
        },
        create: {
          user_id: user.id,
          token,
        },
      })

      try {
        await mailUtil.sendPasswordResetMail(user.email as string, token)
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Send mail failed!',
        })
      }

      return 'ok!'
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
