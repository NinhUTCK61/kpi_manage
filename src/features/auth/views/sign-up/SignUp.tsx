import { api } from '@/libs/api'
import { SignUpFormType, SignUpInputType, SignUpSchemaForm } from '@/libs/schema'
import { LayoutUnAuth } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Reason } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { FC, useCallback } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormSignUp } from './FormSignUp'
import { Success } from './Success'

const getInputType = (reasons: Reason[] = [], input: number[]) => {
  const restReasons = reasons
    .filter((rs) => {
      return input.includes(rs.id)
    })
    .map((rs) => {
      return rs.type
    })
  return restReasons
}
const createSignUpFormSchema = (reasons: Reason[] = []) =>
  SignUpSchemaForm.refine(
    (data) => {
      const arrType = getInputType(reasons, data.reasons)
      console.log(data, 'fuv')
      return arrType.includes('ISSUE')
    },
    {
      message: 'reason_issue',
      path: ['reasons'],
    },
  ).refine(
    (data) => {
      const arrType = getInputType(reasons, data.reasons)
      return arrType.includes('REASON_KNOW')
    },
    {
      message: 'reason_know',
      path: ['reasons'],
    },
  )

const SignUp: FC = () => {
  const { mutate, isLoading, isSuccess } = api.auth.signUp.useMutation()
  const { data: reasons } = api.reason.list.useQuery()

  const methods = useForm<SignUpFormType>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      company_name: '',
      date_of_birth: null,
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

      {isSuccess && <Success />}
    </LayoutUnAuth>
  )
}

export { SignUp }
