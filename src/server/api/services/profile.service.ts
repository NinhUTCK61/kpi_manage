import { UserProfileType } from '@/libs/schema/profile'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'

export class ProfileService {
  async update(profile: UserProfileType, user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.error_user_not_found',
      })
    }

    const userUpdate = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: profile,
    })

    return userUpdate
  }

  async byId(user_id: string) {
    const profileUser = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!profileUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.error_user_not_found',
      })
    }

    const data: UserProfileType = {
      first_name: profileUser.first_name,
      email: profileUser.email,
      name: profileUser.name,
      company_name: profileUser.company_name,
      role_in_company: profileUser.role_in_company,
      image: profileUser.image,
    }

    return data
  }
}
