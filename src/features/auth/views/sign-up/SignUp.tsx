import { api } from '@/libs/api'
import { SignUpSchema } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { FC, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSignUp } from './FormSignUp'
import { Success } from './Success'

const SignUp: FC = () => {
  const { mutate, isLoading, isSuccess } = api.auth.signUp.useMutation()
  const { control, handleSubmit } = useForm<z.infer<typeof SignUpSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignUpSchema),
  })

  const { t } = useTranslation('sign_up')

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = useCallback(
    async (data) => {
      mutate(data, {
        onError: (err) => {
          const error = String(err.message)
          const description = t(error)
          enqueueSnackbar(t('title_failed'), { variant: 'error', description })
        },
      })
    },
    [mutate, t],
  )

  return (
    <>
      <LayoutUnAuth title={t('seo_title')}>
        {!isSuccess && (
          <FormSignUp
            control={control}
            handleSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        )}

        {isSuccess && <Success />}
      </LayoutUnAuth>
    </>
  )
}

export { SignUp }
