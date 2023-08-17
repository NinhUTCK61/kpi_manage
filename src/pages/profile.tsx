import { Profile } from '@/features/auth'
import { appRouter } from '@/server/api/root'
import { authOptions } from '@/server/auth'
import { prisma } from '@/server/db'
import { createServerSideHelpers } from '@trpc/react-query/server'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SuperJSON from 'superjson'

export async function getServerSideProps({ locale, req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session,
      prisma,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  })

  await helpers.profile.me.prefetch()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'profile', 'sign_up', 'meta'])),
      trpcState: helpers.dehydrate(),
    },
  }
}

export default Profile
