import { env } from '@/env.mjs'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient
  middlewareApplied: boolean
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

// if (!globalForPrisma.middlewareApplied) {
//   prisma.$use(async (params, next) => {
//     const result = await next(params)

//     // handle template image url when get list template
//     if (params.model === 'UserTemplate') {
//       if (params.action === 'findMany') {
//         ;(result as (UserTemplate & { template: Template })[]).forEach((element) => {
//           if (element.template.image_url) {
//             const url = element.template.image_url
//             element.template.image_url = `${env.AWS_S3_ENDPOINT}/${url}`
//           }
//         })
//       }
//     }

//     return result
//   })

//   globalForPrisma.middlewareApplied = true
// }

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
