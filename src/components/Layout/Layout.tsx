import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import Head from 'next/head'
import React from 'react'
import { Header, HEIGHT_HEADER } from './Header'
import { Sidebar } from './Sidebar'

type LayoutType = {
  title?: string
  description?: string
  children: React.ReactNode
}

const Layout: React.FC<LayoutType> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'KPI master'}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <ContentPage>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { Layout }

const ContentPage = styled('div')({
  marginTop: `${HEIGHT_HEADER}px`,
  minHeight: `calc(100vh - ${HEIGHT_HEADER}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})
