import { LoginSchema, type SignInType } from '@/libs/schema'
import { Input, LayoutUnAuth, TextColor } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import Hand1 from 'public/assets/svgs/hand1.svg'
import Hand2 from 'public/assets/svgs/hand2.svg'
import Hand3 from 'public/assets/svgs/hand3.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CustomImage } from '../components'

const Login: FC = () => {
  const router = useRouter()
  const { callbackUrl = '/' } = router.query

  const { control, handleSubmit } = useForm<SignInType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const {
    t,
    i18n: { language },
  } = useTranslation('sign_in')

  const redirectForgot = () => {
    router.push('/forgot-password')
  }

  const redirectSignUp = () => {
    router.push('/sign-up')
  }

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    const { email, password } = data
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      language: language,
    })

    if (res?.ok) {
      router.push(callbackUrl as string)
    } else {
      const error = res?.error as string
      const description = t(error)
      enqueueSnackbar(t('login_failed'), { variant: 'error', description })
    }
  }

  return (
    <>
      <LayoutUnAuth title={t('seo_title')}>
        <Stack direction="row" justifyContent="center" pt={10}>
          <Stack
            alignItems="center"
            sx={{ mr: { md: 8, xl: 19.375 }, display: { xs: 'none', md: 'flex' } }}
            spacing={5.25}
            justifyContent="center"
          >
            <video autoPlay loop muted height={362} width={635}>
              <source src="/assets/videos/banner.mp4" type="video/mp4" />
            </video>

            <Stack direction="row" spacing={5}>
              <Image src={Hand1} alt="hand 1" />
              <Image src={Hand2} alt="hand 2" />
              <Image src={Hand3} alt="hand 3" />
            </Stack>
          </Stack>

          <Stack
            sx={{ width: 450, height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}
          >
            <Stack alignItems="center" mb={4}>
              <CustomImage src={Logo} alt="logo" />
              <Typography variant="h2" mb={0.5} align="center">
                {t('title')}
              </Typography>

              <Typography color="greyScale.600" align="center" whiteSpace="nowrap">
                {t('child_title')}
              </Typography>
            </Stack>

            <Stack width="100%" spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
              <Input
                control={control}
                name="email"
                label={t('email') as string}
                fullWidth
                placeholder={t('enter_email') as string}
              />

              <Input
                control={control}
                name="password"
                label={t('password') as string}
                type="password"
                fullWidth
                placeholder={t('enter_password') as string}
              />

              <Stack direction="row" justifyContent="end" alignItems="center" height={46}>
                <TextColor onClick={redirectForgot} mr={1.75}>
                  {t('forgot')}
                </TextColor>
              </Stack>

              <Button fullWidth variant="contained" type="submit">
                {t('login')}
              </Button>

              <Stack
                py={1.5}
                spacing={0.5}
                justifyContent="center"
                direction="row"
                onClick={redirectSignUp}
              >
                <Typography variant="body2" color="greyScale.600" fontWeight={400}>
                  {t('not_have_account')}
                </Typography>
                <TextColor>{t('sign_up')}</TextColor>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </LayoutUnAuth>
    </>
  )
}

export { Login }
