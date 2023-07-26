import { Button, Fade, Slide, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Email from 'public/assets/svgs/email.svg'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildTitle, Title } from '../sign-up'

const Success: FC = () => {
  const router = useRouter()
  const isSuccess = true
  const { t } = useTranslation('forgot_password')

  const redirectSignIn = () => {
    router.push('/sign-in')
  }
  return (
    <Fade in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
      <Slide direction="left" in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
        <Stack
          width={{ xs: '100%', sm: 450 }}
          direction="column"
          alignItems="center"
          margin="auto"
          mt={{ xs: 2, sm: 10 }}
        >
          <Image src={Email} alt="email" />

          <Title mt={1.5} mb={{ xs: 1, sm: 2 }}>
            {t('title') as string}
          </Title>

          <ChildTitle textAlign="center">{t('title_send_mail_success')}</ChildTitle>

          <Button
            fullWidth
            variant="contained"
            onClick={redirectSignIn}
            sx={{ textTransform: 'capitalize', marginTop: 2 }}
          >
            {t('OK')}
          </Button>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
