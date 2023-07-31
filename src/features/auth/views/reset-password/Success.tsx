import { Button, Fade, Slide } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Logo from 'public/assets/svgs/logo.svg'
import { useTranslation } from 'react-i18next'
import { DescriptionTitle, SubTitle } from '../styled'

const Success: React.FC = () => {
  const router = useRouter()
  const isSuccess = true
  const { t } = useTranslation('reset_password')

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <Fade in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
      <Slide direction="left" in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
        <Stack
          width="auto"
          height="100%"
          alignItems="center"
          justifyContent="flex-start"
          mb={2}
          pt={5}
        >
          <Stack alignItems="center" mb={4}>
            <Image src={Logo} alt="logo" />

            <SubTitle>{t('reset_password_success')}</SubTitle>

            <DescriptionTitle>{t('title_reset_success')}</DescriptionTitle>
          </Stack>

          <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
            <Button fullWidth variant="contained" onClick={redirectSignIn}>
              {t('back_to_login')}
            </Button>
          </Stack>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
