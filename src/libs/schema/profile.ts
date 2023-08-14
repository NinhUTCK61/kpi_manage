import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const UpdateProfileInputSchema = UserSchema.partial().required({
  id: true,
  password: true,
  emailVerified: true,
  date_of_birth: true,
})

export type UpdateProfileType = z.infer<typeof UpdateProfileInputSchema>

export const UserProfile = z.object({
  first_name: z.string().max(30).trim().min(1).nullable().optional(),
  name: z.string().max(30).trim().min(1).nullable().optional(),
  company_name: z.string().trim().min(1).nullable().optional(),
  role_in_company: z.string().trim().min(1).nullable().optional(),
  email: z.string().min(1, { message: 'error.message_email' }).email().nullable().optional(),
  image: z.string().trim().min(1).nullable().optional(),
})

export type UserProfileType = z.infer<typeof UserProfile>
