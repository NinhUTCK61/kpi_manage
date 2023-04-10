import { Stack, styled } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { HEIGHT_HEADER, HeaderUnAuth } from './Header'

type LayoutType = {
  title?: string
  description?: string
  children: React.ReactNode
}

const LayoutUnAuth: React.FC<LayoutType> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'KPI master'}</title>
        <meta name="description" content={description} />
      </Head>
      <HeaderUnAuth />
      <Stack direction="row">
        <ContentPage>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { LayoutUnAuth }

const ContentPage = styled('div')(({ theme }) => ({
  marginTop: `${HEIGHT_HEADER}px`,
  minHeight: `calc(100vh - ${HEIGHT_HEADER}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  paddingLeft: theme.spacing(12.5),
  paddingRight: theme.spacing(12.5),
}))
