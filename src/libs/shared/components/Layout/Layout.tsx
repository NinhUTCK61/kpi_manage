import { Box, BoxProps, Stack, styled } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { HEADER_HEIGHT } from './Header'
import { HeaderMobile } from './Header/HeaderMobile'
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
  return (
    <>
      <Head>
        <title>{title || 'KPI master'}</title>
        <meta name="description" content={description} />
      </Head>
      {HeaderComponent ? HeaderComponent : <HeaderMobile />}
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
