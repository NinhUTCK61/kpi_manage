import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const UpdateProfileInputSchema = UserSchema.omit({
  date_of_birth: true,
  password: true,
  id: true,
  created_at: true,
  updated_at: true,
  emailVerified: true,
})

export type UpdateProfileType = z.infer<typeof UpdateProfileInputSchema>
