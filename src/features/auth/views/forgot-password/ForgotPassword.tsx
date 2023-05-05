import { api } from '@/libs/api'
import { ForgotPasswordInputSchema, ForgotPasswordType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormForgotPassword } from './FormForgotPassword'
import { Success } from './Success'

const ForgotPassword: FC = () => {
  const { t } = useTranslation('forgot_password')
  const { mutate, isLoading, isSuccess } = api.auth.forgotPassword.useMutation()

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    mutate(
      { email: data.email },
      {
        onError(error) {
          if (error.data?.zodError) {
            // TODO: add zod error to form

            return
          }

          enqueueSnackbar(t(error.message, { ns: 'common' }), {
            variant: 'error',
          })
        },
      },
    )
  }

  return (
    <LayoutUnAuth title={t('seo_title')}>
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
