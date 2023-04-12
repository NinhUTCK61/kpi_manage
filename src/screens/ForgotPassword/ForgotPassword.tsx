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
    await mutation.mutate(
      {
        email,
      },
      {
        onError(error) {
          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
          })
        },
        onSuccess() {
          router.push('/send-mail-success')
        },
      },
    )
  }

  return (
    <LayoutUnAuth title="Forgot Password">
      <Stack width={450} direction="column" minHeight={'auto'} margin="auto" mt={10}>
        <Stack alignItems="center" mb={4}>
          <Image src={Logo} alt="logo" />

          <Typography variant="h2" mt={1.5} mb={0.5}>
            Forgot Password
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.greyScale[600],
            }}
          >
            Don&#39;t worry! We&#39;ll help you get back on track.
          </Typography>

          <Typography
            variant="body1"
            mt={0.5}
            fontSize={'15px'}
            textAlign={'center'}
            sx={{
              color: (theme) => theme.palette.greyScale[600],
            }}
          >
            Enter email address associated with your account. Once your identity is verified, you
            will receive an email with a link to reset your password. Click on the link to proceed.
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
            sx={{ textTransform: 'capitalize' }}
          >
            Submit
          </Button>

          <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
            <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

            <Typography
              variant="body2"
              fontWeight={400}
              sx={{ cursor: 'pointer' }}
              onClick={redirectBack}
            >
              Back
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { ForgotPassword }
