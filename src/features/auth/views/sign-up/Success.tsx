import { Button, Fade, Slide, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Logo from 'public/assets/svgs/logo.svg'
import { CustomImage } from '../../components'

const Success: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('sign_up')
  const isSuccess = true

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <Fade in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
      <Slide direction="left" in={isSuccess} mountOnEnter unmountOnExit timeout={400}>
        <Stack
          sx={{
            width: 'auto',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 2,
            pt: 5,
          }}
        >
          <Stack alignItems="center" mb={4}>
            <CustomImage src={Logo} alt="logo" />
            <Typography variant="h2" mb={0.5}>
              {t('title_success')}
            </Typography>
            <Typography color="greyScale.600">{t('description_success')}</Typography>
          </Stack>

          <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
            <Button fullWidth variant="contained" onClick={redirectSignIn}>
              {t('back')}
            </Button>
          </Stack>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
