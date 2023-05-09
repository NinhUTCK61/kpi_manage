import { createTRPCRouter } from '@/server/api/trpc'
import { authRouter } from './routers/auth'
import { commentRouter } from './routers/comment'
import { nodeRouter } from './routers/node'
import { profileRouter } from './routers/profile'
import { reasonRouter } from './routers/reason'
import { templateRouter } from './routers/template'
import { utilsRouter } from './routers/utils'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  template: templateRouter,
  node: nodeRouter,
  reason: reasonRouter,
  utils: utilsRouter,
  comment: commentRouter,
  profile: profileRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
