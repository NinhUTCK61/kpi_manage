import { LayoutUnAuth, MuiImage } from '@/libs/shared/components'
import { authRouter } from '@/server/api/routers/auth'
import { authOptions } from '@/server/auth'
import { prisma } from '@/server/db'
import { Button, Stack, Typography } from '@mui/material'
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import VerifyError from 'public/assets/svgs/verify_error.svg'
import VerifySuccess from 'public/assets/svgs/verify_success.svg'
import { FC, useState } from 'react'

export async function getServerSideProps({ locale, req, res, query }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  if (session || !query?.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const caller = authRouter.createCaller({ session: null, prisma })

  let success
  let errorMessage = ''

  try {
    await caller.verify({ token: query?.token as string })
    success = true
  } catch (error) {
    success = false
    errorMessage = (error as { message: string }).message
  }

  return {
    props: {
      success,
      errorMessage,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

type Props = {
  success: boolean
  errorMessage?: string
}

const Verify: FC<Props> = ({ success, errorMessage }) => {
  const { t } = useTranslation('common')
  const [_success] = useState(success)

  return (
    <LayoutUnAuth title={t('verify_title')}>
      <Stack mb={2} pt={5} alignItems="center">
        <Stack alignItems="center" mb={4}>
          <MuiImage src={_success ? VerifySuccess : VerifyError} alt="verify image" />
          <Typography variant="h2" mb={0.5}>
            {t(_success ? 'verify_success' : 'verify_fail')}
          </Typography>
          <Typography color="greyScale.600">
            {t(_success ? 'description_verify_success' : (errorMessage as string))}
          </Typography>
        </Stack>

        <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
          <Button LinkComponent={Link} href="/" fullWidth variant="contained">
            {t('Ok')}
          </Button>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export default Verify
