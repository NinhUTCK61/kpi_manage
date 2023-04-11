import { Input } from '@/components/Form/Input'
import { LayoutUnAuth } from '@/components/Layout'
import { StateToast, Toast } from '@/components/Toast'
import { LoginSchema, type SignInType } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import bannerChild from 'public/assets/imgs/child_banner_login_1.png'
import Logo from 'public/assets/imgs/logo_login.png'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextColor } from './TextColor'

const Login: NextPage = () => {
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

  const handleSignIn = async (email: string, password: string) => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      language: language,
    })

    if (res?.ok) {
      router.push(callbackUrl as string)
    } else {
      // TODO: set Alert Error
      const error = res?.error as string
      setState({
        open: true,
        title: 'Login failed',
        description: t(error),
        type: 'error',
      })
    }
  }

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    try {
      await handleSignIn(data.email, data.password)
    } catch (error) {}
  }

  const [state, setState] = useState<StateToast>({
    open: false,
    title: '',
    description: '',
    type: 'info',
  })

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <>
      <LayoutUnAuth title="Login">
        <Stack direction="row" justifyContent="center" pt={10}>
          <Stack
            alignItems="center"
            sx={{ marginRight: '155px', display: { xs: 'none', md: 'flex' } }}
            spacing={5.25}
            justifyContent="center"
          >
            <video autoPlay loop muted height={362} width={635}>
              <source src="/assets/videos/banner.mp4" type="video/mp4" />
            </video>
            <Image src={bannerChild} alt="banner-child" />
          </Stack>
          <Stack
            sx={{ width: 450, height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}
          >
            <Stack alignItems="center" mb={4}>
              <Image
                src={Logo}
                alt="logo"
                style={{
                  marginBottom: '12px',
                }}
              />
              <Typography variant="h2" fontWeight={700} sx={{ marginBottom: '4px' }}>
                Log in to your account
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: (theme) => theme.palette.greyScale[600],
                  fontWeight: 400,
                }}
              >
                Welcome back! Please enter your details.
              </Typography>
            </Stack>
            <Stack width="100%" spacing={2}>
              <Input
                control={control}
                name="email"
                label="Email"
                fullWidth
                placeholder="Enter your email"
              />
              <Input
                control={control}
                name="password"
                label="Password"
                type="password"
                fullWidth
                placeholder="Enter your password"
              />
              <Stack direction="row" justifyContent="end" alignItems="center" height={46}>
                <TextColor variant="body2" onClick={redirectForgot} mr={1.75}>
                  Forgot password?
                </TextColor>
              </Stack>

              <Button fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>
                Log in
              </Button>
              <Stack
                py={1.5}
                spacing={0.5}
                justifyContent="center"
                direction="row"
                onClick={redirectSignUp}
              >
                <Typography variant="body2" color="greyScale.600" fontWeight={400}>
                  Don’t have an account?
                </Typography>
                <TextColor variant="body2" fontWeight={400}>
                  Sign up
                </TextColor>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Toast state={state} handleClose={handleClose} />
      </LayoutUnAuth>
    </>
  )
}

export { Login }
