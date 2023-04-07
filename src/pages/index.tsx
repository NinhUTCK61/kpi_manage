import { Layout } from '@/components/Layout/Layout'
import { api } from '@/utils/api'
import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: sessionData } = useSession()
  const mutation = api.auth.forgotPassword.useMutation()
  const handleLogin = () => {
    const email = 'console.namee@gmail.com'
    mutation.mutate({ email: email })
  }

  return (
    <Layout title="KPI Master">
      <p>{sessionData && <span>Logged in as {sessionData.user?.name}</span>}</p>
      <p>{sessionData && JSON.stringify(sessionData)}</p>
      <button onClick={sessionData ? () => void signOut() : () => void signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
      <button onClick={() => handleLogin()}>Forgot</button>
    </Layout>
  )
}

export default Home
