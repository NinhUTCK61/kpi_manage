import { greyScale } from '@/libs/config/theme'
import { Button, Fade, Slide, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Email from 'public/assets/svgs/email.svg'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

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
        <Stack width={450} direction="column" alignItems="center" margin="auto" mt={10}>
          <Image src={Email} alt="email" />

          <Typography variant="h2" mt={1.5}>
            {t('title') as string}
          </Typography>

          <Typography variant="body2" marginTop={4} textAlign="center" color={greyScale[600]}>
            {t('title_send_mail_success')}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={redirectSignIn}
            sx={{ textTransform: 'capitalize', marginTop: 2 }}
          >
            Ok
          </Button>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
