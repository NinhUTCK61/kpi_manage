import { SignUp } from '@/features/auth'
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

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma,
    },
    transformer: SuperJSON, // optional - adds superjson serialization
  })

  await helpers.reason.list.prefetch()

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sign_up', 'meta'])),
      trpcState: helpers.dehydrate(),
    },
  }
}

export default SignUp
