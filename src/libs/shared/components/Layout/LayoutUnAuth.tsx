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
        <title>{title ? t(title) : 'KPI master'}</title>
        <meta name="description" content={description} />
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
