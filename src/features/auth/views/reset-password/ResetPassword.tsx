import { api } from '@/libs/api'
import { ResetPasswordSchemaInput, ResetPasswordType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormResetPassword } from './FromResetPassword'
import { Success } from './Success'

const ResetPassword: FC = () => {
  const router = useRouter()
  const { mutate, isLoading, isSuccess } = api.auth.resetPassword.useMutation()

  const { control, handleSubmit } = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordSchemaInput),
  })

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    const { token } = router.query as { token: string }
    mutate(
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
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
