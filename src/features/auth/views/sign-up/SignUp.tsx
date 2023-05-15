import { api } from '@/libs/api'
import { SignUpFormType, SignUpInputType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { FC, useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { createSignUpFormSchema } from '../../hepler'
import { FormSignUp } from './FormSignUp'
import { Success } from './Success'

const SignUp: FC = () => {
  const { mutate, isLoading, isSuccess, data } = api.auth.signUp.useMutation()
  const { data: reasons } = api.reason.list.useQuery()

  const methods = useForm<SignUpFormType>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      company_name: '',
      date_of_birth: '1980-01-01T00:00:00Z',
      role_in_company: '',
      reenter_password: '',
      reasons: [],
    },
    resolver: zodResolver(createSignUpFormSchema(reasons)),
  })
  const { t } = useTranslation('sign_up')

  const onSubmit: SubmitHandler<SignUpInputType> = useCallback(
    async (data) => {
      mutate(data, {
        onError: (err) => {
          const error = String(err.message)
          const description = t(error, { ns: 'common' })
          enqueueSnackbar(t('title_failed'), { variant: 'error', description })
        },
      })
    },
    [mutate, t],
  )

  return (
    <LayoutUnAuth title={t('seo_title')}>
      {!isSuccess && (
        <FormProvider {...methods}>
          <FormSignUp handleSubmit={methods.handleSubmit(onSubmit)} isLoading={isLoading} />
        </FormProvider>
      )}

      {isSuccess && <Success email={data.email as string} />}
    </LayoutUnAuth>
  )
}

export { SignUp }
