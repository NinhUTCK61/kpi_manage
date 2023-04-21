import { prisma } from '@/server/db'

export class ReasonService {
  async getListReasons() {
    const reason = await prisma.reason.findMany()
    return reason
  }
}
