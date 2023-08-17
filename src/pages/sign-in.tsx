import { Login } from '@/features/auth'
import { authOptions } from '@/server/auth'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'sign_in', 'meta'])),
    },
  }
}

export default Login
