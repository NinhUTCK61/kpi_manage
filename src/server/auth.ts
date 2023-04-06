import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth'

import { env } from '@/env.mjs'
import { LoginSchema } from '@/schema'
import { prisma } from '@/server/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { consola } from 'consola'
import CredentialsProvider from 'next-auth/providers/credentials'
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
    jwt({ token, user, account, profile }) {
      consola.info('jwt:token', token)
      consola.info('jwt:account', account)
      consola.info('jwt:user', user)
      consola.info('jwt:profile', profile)
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, user, token }) {
      consola.info('session:user', user)
      consola.info('session:token', token)
      consola.info('session:session', session)
      if (session.user) {
        session.user.id = token.id as string
        // session.user.role = user.role; <-- put other properties on the session here
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
          label: 'Username',
          type: 'text',
          placeholder: 'user@kpi-master.jp',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials)

          const user = await prisma.user.findFirst({
            where: { email },
          })

          if (!user) return null

          // const isValidPassword = await verify(result.password, password);
          // if (!isValidPassword) return null;

          return user
        } catch (error) {
          console.log(error)
          return null
        }
      },
    },

    ),
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
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
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
