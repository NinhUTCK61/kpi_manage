import { api } from '@/utils/api'
import { ThemeProvider } from '@mui/material'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps, AppType } from 'next/app'

import { defaultTheme } from '@/common/theme'
import createEmotionCache from '@/libs/config/createEmotionCache'
import '@/styles/globals.css'
import { CacheProvider, type EmotionCache } from '@emotion/react'
import { appWithTranslation } from 'next-i18next'

const clientSideEmotionCache = createEmotionCache()
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp: AppType<{ session: Session | null; emotionCache?: EmotionCache }> = ({
  Component,
  pageProps: { session, emotionCache = clientSideEmotionCache, ...pageProps },
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  )
}

export default api.withTRPC(appWithTranslation(MyApp))
