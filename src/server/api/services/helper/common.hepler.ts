import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'

export class CommonHelper {
  async validateUserTemplate(template_id: string, user_id: string) {
    const userTemplate = await prisma.userTemplate.findFirst({
      where: {
        template_id,
        user_id,
      },
    })

    if (!userTemplate) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.unauthorized',
      })
    }

    return userTemplate
  }
}
