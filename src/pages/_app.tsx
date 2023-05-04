import { api } from '@/libs/api'
import createEmotionCache from '@/libs/config/createEmotionCache'
import { defaultTheme } from '@/libs/config/theme'
import { customComponents, defaultAnchor } from '@/libs/shared/components/Snackbar'
import { type EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps, AppType } from 'next/app'
import { SnackbarProvider } from 'notistack'

const clientSideEmotionCache = createEmotionCache()
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType<{ session: Session | null; emotionCache?: EmotionCache }> = ({
  Component,
  pageProps: { session, emotionCache: _ = clientSideEmotionCache, ...pageProps },
}) => {
  return (
    // <CacheProvider value={emotionCache}>
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          anchorOrigin={defaultAnchor}
          autoHideDuration={1000}
          Components={customComponents}
        >
          <CssBaseline />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </SessionProvider>
    // </CacheProvider>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
