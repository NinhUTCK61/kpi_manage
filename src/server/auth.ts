import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth'

import { env } from '@/env.mjs'
import { LoginSchema } from '@/libs/schema'
import { prisma } from '@/server/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verify } from 'argon2'
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }

      if (!session) {
        const data = await prisma.user.findUnique({ where: { id: token.id as string } })

        token.picture = data?.image || token.picture
        token.name = data?.name || token.name
      } else if (trigger === 'update') {
        token.picture = session.image || token.picture
        token.name = session.name || token.name
      }

      return token
    },
    session({ session, token, trigger }) {
      if (session.user) {
        session.user.id = token.id as string
        // session.user.role = user.role; <-- put other properties on the session here
      }
      if (trigger === 'update') {
        // You can update the session in the database if it's not already updated.

        // Make sure the updated value is reflected on the client
        session.user.image = token.picture
        session.user.name = token.name
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'user@kpi-master.jp',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (async (credentials) => {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const { email, password } = await LoginSchema.parseAsync(credentials)
        const user = await prisma.user.findFirst({
          where: { email },
        })

        if (!user) {
          throw new Error('not_found')
        }

        if (user && user.password) {
          const isValidPassword = await verify(user.password, password)
          if (!isValidPassword) {
            throw new Error('incorrect')
          }

          if (!user.emailVerified) {
            throw new Error('verify')
          }

          return user
        } else {
          throw new Error('incorrect')
        }
      }) as CredentialsConfig['authorize'],
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
