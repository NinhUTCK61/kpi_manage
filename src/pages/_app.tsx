import { api } from '@/libs/api'
import createEmotionCache from '@/libs/config/createEmotionCache'
import { defaultTheme } from '@/libs/config/theme'
import { customComponents, defaultAnchor } from '@/libs/shared/components/Snackbar'
import { type EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { ReactElement, ReactNode } from 'react'

const clientSideEmotionCache = createEmotionCache()
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  session: Session | null
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  pageProps: { session, emotionCache: _ = clientSideEmotionCache, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          anchorOrigin={defaultAnchor}
          autoHideDuration={1000}
          Components={customComponents}
        >
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
