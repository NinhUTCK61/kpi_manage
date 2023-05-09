import { UserWithoutPasswordSchema } from '@/libs/schema'
import { UpdateProfileInputSchema } from '@/libs/schema/profile'
import { ProfileService } from '../services/profile.service'
import { createTRPCRouter, protectedProcedure } from '../trpc'

const profileService = new ProfileService()

export const profileRouter = createTRPCRouter({
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/profile' } })
    .input(UpdateProfileInputSchema)
    .output(UserWithoutPasswordSchema)
    .mutation(({ input, ctx }) => {
      return profileService.update(input, ctx.session.user.id)
    }),
})
