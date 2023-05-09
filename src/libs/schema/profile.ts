import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const UpdateProfileInputSchema = UserSchema.partial().required({
  id: true,
})

export type UpdateProfileType = z.infer<typeof UpdateProfileInputSchema>
