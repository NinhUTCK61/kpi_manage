import { api } from '@/libs/api'
import { ForgotPasswordInputSchema, ForgotPasswordType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LanguageEmail } from '../../constant'
import { FormForgotPassword } from './FormForgotPassword'
import { Success } from './Success'

const ForgotPassword = () => {
  const { t } = useTranslation('forgot_password')
  const { mutate, isLoading, isSuccess } = api.auth.forgotPassword.useMutation()
  const router = useRouter()

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    mutate(
      { email: data.email, language: router.locale as LanguageEmail },
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
    <>
      {!isSuccess && (
        <FormForgotPassword
          isLoading={isLoading}
          control={control}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}

      {isSuccess && <Success />}
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => (
  <LayoutUnAuth title="forgot_password.title" description="forgot_password.description">
    {page}
  </LayoutUnAuth>
)

export { ForgotPassword }
