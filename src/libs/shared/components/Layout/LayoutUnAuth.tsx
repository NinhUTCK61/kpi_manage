import { Stack, styled } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { HEADER_HEIGHT, HeaderUnAuth } from './Header'

type LayoutType = {
  title?: string | null
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
  marginTop: HEADER_HEIGHT,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
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
