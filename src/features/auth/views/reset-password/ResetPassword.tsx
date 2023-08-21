import { api } from '@/libs/api'
import { ResetPasswordInputSchema, ResetPasswordType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormResetPassword } from './FormResetPassword'
import { Success } from './Success'

const ResetPassword = () => {
  const router = useRouter()
  const { mutate, isLoading, isSuccess } = api.auth.resetPassword.useMutation()

  const { t } = useTranslation(['reset_password'])

  const { control, handleSubmit } = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      token: '',
    },
    resolver: zodResolver(ResetPasswordInputSchema),
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
        <FormResetPassword
          isLoading={isLoading}
          control={control}
          handleSubmit={handleSubmit(onSubmit)}
        />
      )}

      {isSuccess && <Success />}
    </>
  )
}

ResetPassword.getLayout = (page: ReactElement) => (
  <LayoutUnAuth title="reset_password.title" description="reset_password.description">
    {page}
  </LayoutUnAuth>
)

export { ResetPassword }
