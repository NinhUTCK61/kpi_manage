import { api } from '@/libs/api'
import { SignUpFormType, SignUpInputType } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { LanguageEmail } from '../../constant'
import { createSignUpFormSchema } from '../../hepler'
import { FormSignUp } from './FormSignUp'
import { Success } from './Success'

const SignUp = () => {
  const { mutate, isLoading, isSuccess, data } = api.auth.signUp.useMutation()
  const { data: reasons } = api.reason.list.useQuery()
  const router = useRouter()

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
      mutate(
        { ...data, language: router.locale as LanguageEmail },
        {
          onError: (err) => {
            const error = String(err.message)
            const description = t(error, { ns: 'common' })
            enqueueSnackbar(t('title_failed'), { variant: 'error', description })
          },
        },
      )
    },
    [mutate, t, router],
  )

  return (
    <>
      {!isSuccess && (
        <FormProvider {...methods}>
          <FormSignUp handleSubmit={methods.handleSubmit(onSubmit)} isLoading={isLoading} />
        </FormProvider>
      )}

      {isSuccess && <Success email={data.email as string} />}
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => <LayoutUnAuth title="sign_up.title">{page}</LayoutUnAuth>

export { SignUp }
