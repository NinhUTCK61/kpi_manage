import { Layout } from '@/components/Layout/Layout'
import { GetStaticPropsContext, type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home: NextPage = () => {
  const { data: sessionData } = useSession()

  return (
    <Layout title="KPI Master">
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <p>{sessionData && JSON.stringify(sessionData)}</p>
      <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </Layout>
  )
}

export default Home
