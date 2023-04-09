import { Layout } from '@/components/Layout/Layout'
import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

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
