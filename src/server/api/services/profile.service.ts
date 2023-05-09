import { UpdateProfileType } from '@/libs/schema/profile'
import { prisma } from '@/server/db'

export class ProfileService {
  async update(user: UpdateProfileType, user_id: string) {
    const userUpdate = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: user,
    })
    return userUpdate
  }
}
