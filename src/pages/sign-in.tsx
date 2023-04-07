import banner1 from '@/assets/imgs/banner_login_1.png'
import bannerChild from '@/assets/imgs/child_banner_login_1.png'
import Logo from '@/assets/imgs/logo_login.png'
import { CheckBox } from '@/components/Form/CheckBox'
import { Input } from '@/components/Form/Input'
import { ContainerCustom, Layout } from '@/components/Layout'
import { LoginSchema } from '@/schema'
import { Button, Typography, styled } from '@mui/material'
import { Stack } from '@mui/system'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Login: NextPage = () => {
  const router = useRouter()

  const { callbackUrl = '/' } = router.query

  const { control } = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [remember, setRemember] = useState<boolean>(true)

  const handleRemember = () => {
    setRemember((pre) => !pre)
  }

  const redirectForgot = () => {
    router.push('/forgot-password')
  }

  const redirectSignUp = () => {
    router.push('/sign-up')
  }
  const email = 'trungnh@solashi.com'
  const password = 'trung9937'

  const handleSignIn = async () => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      language: 'en',
    })

    if (res?.ok) {
      router.push(callbackUrl as string)
    } else {
      // TODO: set Alert Error
      const error = res?.error
      console.log(error)
    }
  }

  return (
    <>
      <Layout title="Login">
        <ContainerCustom direction="row" justifyContent="center" pt={10}>
          <Stack
            alignSelf="center"
            sx={{ marginRight: '155px', display: { xs: 'none', md: 'flex' } }}
            spacing={5.25}
          >
            <Image src={banner1} alt="banner1" />
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
                  filter: 'drop-shadow(0px 2px 40px rgba(17, 17, 17, 0.08));',
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
            <StackInput spacing={2}>
              <Input
                control={control}
                name="email"
                label="Email"
                fullWidth
                placeholder="Enter your email"
              />
              <Input
                control={control}
                name="email"
                label="Password"
                fullWidth
                placeholder="Enter your password"
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <CheckBox value={remember} label="Remember login" onClick={handleRemember} />
                <TextColor variant="body2" onClick={redirectForgot}>
                  Forgot password?
                </TextColor>
              </Stack>

              <Button fullWidth variant="contained" onClick={handleSignIn}>
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
                  {' '}
                  Sign up
                </TextColor>
              </Stack>
            </StackInput>
          </Stack>
        </ContainerCustom>
      </Layout>
    </>
  )
}

const StackInput = styled(Stack)({
  width: '100%',
})

const TextColor = styled(Typography)(({ theme }) => ({
  color: theme.palette.customPrimary[500],
  fontWeight: 600,
  cursor: 'pointer',
}))

export default Login
