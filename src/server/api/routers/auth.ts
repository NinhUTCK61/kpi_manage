import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      return user;
    }),
});
