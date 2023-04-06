import { api } from '@/utils/api'
import { ThemeProvider } from '@mui/material'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'

import { defaultTheme } from '@/common/theme'
import '@/styles/globals.css'
import { useRouter } from 'next/router'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <Component key={router.asPath} {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
