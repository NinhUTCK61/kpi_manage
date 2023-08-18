import { Box, BoxProps, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
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

  return (
    <>
      <Head>
        <title>{title ? t(title) : 'KPI master'}</title>
        <meta name="description" content={description} />
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Sign in to Kpi master" />
        <meta property="og:title" content="Sign in" />
        <meta property="og:description" content="Please Sign in" />
        <meta property="og:image" content="https://i.imgur.com/l9pWgUw.png" />
        <meta property="og:image:width" content="367" />
        <meta property="og:image:height" content="128" />
        <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
        <meta property="og:url" content="https://staging.kpi-master.com/en/sign-in" />
        <meta property="og:site_name" content="KPI Master" />
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
