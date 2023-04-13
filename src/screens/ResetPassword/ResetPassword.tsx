import { greyScale } from '@/common/theme'
import { Input } from '@/components/Form/Input'
import { LayoutUnAuth } from '@/components/Layout'
import { PasswordStateValidation } from '@/components/PasswordStateValidation'
import { ResetPasswordSchema, ResetPasswordType } from '@/libs/schema'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { SubmitHandler, useForm } from 'react-hook-form'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const mutation = api.auth.resetPassword.useMutation()

  const { control, handleSubmit, watch } = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  })

  const password = watch('password')

  const redirectBack = () => {
    router.back()
  }

  const { token } = router.query as { token: string }

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    mutation.mutate(
      {
        password: data.password,
        token,
      },
      {
        onError(error) {
          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
          })
        },
        onSuccess() {
          enqueueSnackbar('Change password success!', {
            variant: 'success',
          })
          router.push('/sign-in')
        },
      },
    )
  }

  return (
    <LayoutUnAuth title="Reset Password">
      <Stack width={460} direction="column" margin="auto" mt={10}>
        <Stack alignItems="center" mb={4}>
          <Image src={Logo} alt="logo" />

          <Typography variant="h2" mt={1.5} mb={0.5}>
            Reset Password
          </Typography>

          <Typography variant="body1" color={greyScale[600]} textAlign="center" width={507}>
            Keep your account secure by changing your password regularly
          </Typography>
        </Stack>

        <Stack width="100%" spacing={2}>
          <Input
            sx={{ width: 450 }}
            control={control}
            name="password"
            label="New password"
            type="password"
            placeholder="enter your new password"
          />
          <PasswordStateValidation password={password} />

          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ textTransform: 'capitalize', width: 450 }}
          >
            Submit
          </Button>

          <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
            <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

            <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={redirectBack}>
              Back
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { ResetPassword }
