import { api } from '@/libs/api'
import { ForgotPasswordSchema, ForgotPasswordType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { enqueueSnackbar } from 'notistack'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormForgotPassword } from './FormForgotPassword'
import { Success } from './Success'

const ForgotPassword: FC = () => {
  const { mutate, isLoading, isSuccess } = api.auth.forgotPassword.useMutation()

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    mutate(
      { email: data.email },
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
    <LayoutUnAuth title="Forgot password">
      {!isSuccess && (
        <FormForgotPassword
          isLoading={isLoading}
          control={control}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}

      {isSuccess && <Success />}
    </LayoutUnAuth>
  )
}

export { ForgotPassword }
