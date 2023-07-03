import { UserWithoutPasswordSchema } from '@/libs/schema'
import { UserProfile } from '@/libs/schema/profile'
import { z } from 'zod'
import { ProfileService } from '../services/profile.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const profileService = new ProfileService()

export const profileRouter = createTRPCRouter({
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/profile' } })
    .input(UserProfile)
    .output(UserWithoutPasswordSchema)
    .mutation(({ input, ctx }) => {
      return profileService.update(input, ctx.session.user.id)
    }),
  me: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/profile' } })
    .input(z.void())
    .output(UserProfile)
    .query(({ ctx }) => {
      return profileService.byId(ctx.session.user.id)
    }),
})
