import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import React from 'react'
import { HeaderUnAuth } from './Header'

type LayoutType = {
  title?: string | null
  description?: string
  children: React.ReactNode
}

const LayoutUnAuth: React.FC<LayoutType> = ({ title, description, children }) => {
  const { t } = useTranslation('meta')

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{title ? t(title) : 'KPI master'}</title>
        <meta name="description" content={description} data-id="main" />
        <meta charSet="UTF-8" />
        <meta property="og:url" content="https://staging.kpi-master.com/en/sign-in" />

        <meta name="og:site_name" content="KPI Master the best team" />
        <meta property="og:title" content="Sign in | KPI Master" />

        <meta property="og:image" content="https://i.imgur.com/l9pWgUw.png" />
        <meta property="og:image:width" content="100" />
        <meta property="og:image:height" content="100" />

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
