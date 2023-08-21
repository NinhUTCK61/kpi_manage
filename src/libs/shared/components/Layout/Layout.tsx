import { Box, BoxProps, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { HEADER_HEIGHT, Header } from './Header'
import { Sidebar } from './Sidebar'

type LayoutType = BoxProps<
  'div',
  {
    title?: string | null
    description?: string
    children: React.ReactNode
    HeaderComponent?: React.ReactNode
    disableSidebar?: boolean
  }
>

const Layout: React.FC<LayoutType> = ({
  title,
  description,
  children,
  HeaderComponent,
  disableSidebar = false,
  ...contentProps
}) => {
  const { t } = useTranslation('meta')
  const router = useRouter()

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title ? t(title) : 'KPI master'}</title>
        <meta
          name="description"
          content={`${description ? t(description) : t('title_website')}`}
          data-id="main"
        />
        <meta charSet="UTF-8" />
        <meta
          property="og:url"
          content={`https://staging.kpi-master.com/${router.locale}${router.asPath}`}
        />

        <meta name="og:site_name" content="KPI Master" />
        <meta property="og:title" content={`${title ? t(title) : t('content')}`} />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/dtcbs7ule/image/upload/v1692602694/images/kpi-master.png"
        />
        <meta property="og:image:width" content="100" />
        <meta property="og:image:height" content="100" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thinhtr14243689" />
        <meta name="twitter:title" content={`${title ? t(title) : t('content')}`} />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dtcbs7ule/image/upload/v1692602694/images/kpi-master.png"
        />

        <meta property="imdb:pageType" content="title" />
        <meta property="imdb:subPageType" content="main" />
      </Head>
      {HeaderComponent ? HeaderComponent : <Header />}
      <Stack direction="row">
        {!disableSidebar && <Sidebar />}
        <ContentPage {...contentProps}>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { Layout }

const ContentPage = styled(Box)(({ theme }) => ({
  marginTop: HEADER_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  padding: theme.spacing(3, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))
