import { api } from '@/libs/api'
import styled from '@emotion/styled'
import { Button, Fade, Slide, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import Logo from 'public/assets/svgs/logo.svg'
import { useCountdown } from 'usehooks-ts'
import { CustomImage } from '../../components'

type PropType = {
  email: string
}

const Span = styled('span')({
  textAlign: 'center',
  variant: 'body2',
  color: 'base.contrastText',
  fontWeight: 800,
  ml: 0.5,
})

const Success: React.FC<PropType> = ({ email }) => {
  const router = useRouter()
  const { t } = useTranslation('sign_up')
  const { mutate } = api.auth.resendVerifyEmail.useMutation()
  const isSuccess = true

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  })

  const handleResendEmail = () => {
    if (count === 0 || count === 60) {
      mutate(
        { email },
        {
          onError(error) {
            enqueueSnackbar(t(error.message), {
              variant: 'error',
            })
          },
          onSuccess() {
            startCountdown()
            enqueueSnackbar(t('resend_message_success'), {
              variant: 'success',
            })
          },
        },
      )
      resetCountdown()
    }
  }

  const isVisibleCount = count !== 60 && count !== 0

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
          <Stack width={{ xs: '100%', md: 460 }} spacing={2} mt={3.5} justifyContent="center">
            <Button
              disabled={isVisibleCount}
              onClick={handleResendEmail}
              sx={{
                cursor: 'pointer',
                transition: 'all 1s',
              }}
            >
              {t('resend_email')}
            </Button>
            <Typography
              textAlign="center"
              align="center"
              variant="body2"
              color="base.contrastText"
              visibility={isVisibleCount ? 'visible' : 'hidden'}
            >
              {t('resend_email_countdown')}
              <Span>
                {count} {t('seconds')}
              </Span>
            </Typography>
          </Stack>
        </Stack>
      </Slide>
    </Fade>
  )
}

export { Success }
