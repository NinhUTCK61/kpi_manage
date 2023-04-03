import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KPI Master</title>
        <meta name="description" content="kpi master" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthShowcase />
      </main>
    </>
  )
}

export default Home

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  return (
    <div>
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <p>{sessionData && JSON.stringify(sessionData)}</p>
      <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}
