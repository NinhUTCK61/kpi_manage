import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const UpdateProfileInputSchema = UserSchema.partial().required({
  id: true,
  password: true,
  emailVerified: true,
  date_of_birth: true,
})

export type UpdateProfileType = z.infer<typeof UpdateProfileInputSchema>

// export const UserProfile = z.object({
//   first_name: z.string().max(255).trim().min(1),
//   name: z.string().max(255).trim().min(1),
//   company_name: z.string().trim().min(1),
//   role_in_company: z.string().trim().min(1),
//   email: z.string().min(1, { message: 'error.message_email' }).email(),
//   image: z.string().trim().min(1),
// })

export const UserProfile = UserSchema.partial().omit({
  id: true,
  password: true,
  emailVerified: true,
  date_of_birth: true,
})

export type UserProfileType = z.infer<typeof UserProfile>
