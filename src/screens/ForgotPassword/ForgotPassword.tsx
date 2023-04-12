import { Input } from '@/components/Form/Input'
import { LayoutUnAuth } from '@/components/Layout'
import { ForgotPasswordSchema, type ForgotPasswordType } from '@/libs/schema'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import ArrowLeft from 'public/assets/imgs/arrow_left.png'
import Logo from 'public/assets/imgs/logo_login.png'
import { SubmitHandler, useForm } from 'react-hook-form'

const ForgotPassword: NextPage = () => {
  const router = useRouter()
  const mutation = api.auth.forgotPassword.useMutation()

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const redirectBack = () => {
    router.back()
  }

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
    const { email } = data
    try {
      await mutation.mutate(
        {
          email,
        },
        {
          onError(error) {
            enqueueSnackbar(`${error.message}`, {
              variant: 'error',
              description: `${error.message}`,
            })
          },
          onSuccess() {
            router.push('/send-mail-success')
          },
        },
      )
    } catch (error) {}
  }

  return (
    <LayoutUnAuth title="Forgot Password">
      <Stack direction="row" justifyContent="center" pt={10}>
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
              Forgot Password
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.greyScale[600],
                fontWeight: 400,
              }}
            >
              Don&#39;t worry! We&#39;ll help you get back on track.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.greyScale[600],
                fontWeight: 400,
                marginTop: 4,
                fontSize: '15px',
                textAlign: 'center',
              }}
            >
              Enter email address associated with your account. Once your identity is verified, you
              will receive an email with a link to reset your password. Click on the link to
              proceed.
            </Typography>
          </Stack>
          <Stack width="100%" spacing={2}>
            <Input
              control={control}
              name="email"
              label="Email"
              fullWidth
              placeholder="enter your email"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={mutation.isLoading}
              sx={{ textTransform: 'capitalize' }}
            >
              Submit
            </Button>
            <Stack
              py={1.5}
              spacing={0.5}
              justifyContent="center"
              alignItems="center"
              direction="row"
              sx={{ cursor: 'pointer' }}
              onClick={redirectBack}
            >
              <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />
              <Typography variant="body2" fontWeight={400}>
                Back
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { ForgotPassword }
