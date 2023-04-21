import { HEIGHT_HEADER } from '@/libs/shared/components/Layout/Header'
import { Stack, styled } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { HeaderTemplate } from './HeaderTemplate'

type LayoutType = {
  title?: string | null
  description?: string
  children: React.ReactNode
}

const LayoutTemplate: React.FC<LayoutType> = ({ title, description, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'KPI master'}</title>
        <meta name="description" content={description} />
      </Head>
      <HeaderTemplate />
      <Stack direction="row">
        <ContentPage>{children}</ContentPage>
      </Stack>
    </>
  )
}

export { LayoutTemplate }

const ContentPage = styled('div')({
  marginTop: HEIGHT_HEADER,
  minHeight: `calc(100vh - ${HEIGHT_HEADER}px)`,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
})
