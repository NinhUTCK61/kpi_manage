import { LayoutUnAuth } from '@/components/Layout'
import { ResetPasswordSchema, ResetPasswordType } from '@/libs/schema'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormResetPassword } from './FromResetPassword'
import { Success } from './Success'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const { mutate, isLoading, isSuccess } = api.auth.resetPassword.useMutation()

  const { control, handleSubmit } = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    const { token } = router.query as { token: string }
    mutate(
      {
        password: data.password,
        token,
      },
      {
        onError(error) {
          if (error.data?.zodError) {
            const errorMes = JSON.parse(error.message)[0].message
            enqueueSnackbar(`${errorMes}`, {
              variant: 'error',
            })

            return
          }

          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
          })
        },
      },
    )
  }

  return (
    <LayoutUnAuth title="Reset Password">
      {!isSuccess && (
        <FormResetPassword
          isLoading={isLoading}
          control={control}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}

      {isSuccess && <Success />}
    </LayoutUnAuth>
  )
}

export { ResetPassword }
