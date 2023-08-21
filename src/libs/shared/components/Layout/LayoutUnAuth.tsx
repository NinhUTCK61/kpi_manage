import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { HeaderUnAuth } from './Header'

type LayoutType = {
  title?: string | null
  description?: string
  children: React.ReactNode
}

const LayoutUnAuth: React.FC<LayoutType> = ({ title, description, children }) => {
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
      <HeaderUnAuth />
      <ContentPage>{children}</ContentPage>
    </>
  )
}

export { LayoutUnAuth }

const ContentPage = styled('div')(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  paddingLeft: theme.spacing(12.5),
  paddingRight: theme.spacing(12.5),
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))
