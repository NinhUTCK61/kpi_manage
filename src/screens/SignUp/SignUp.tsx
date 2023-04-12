import { LayoutUnAuth } from '@/components/Layout'
import { SignUpSchema } from '@/libs/schema'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useCallback, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSignUp } from './FormSignUp'
import { Success } from './Success'

const SignUp: NextPage = () => {
  const router = useRouter()
  const { mutate, isLoading, isSuccess } = api.auth.signUp.useMutation()
  const { control, handleSubmit, watch } = useForm<z.infer<typeof SignUpSchema>>({
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

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  const list_text_validate = useMemo(() => {
    const data = watch('password')
    const _list = [
      { id: 'error_min', active: data.length >= 8, text: t('error_min') },
      { id: 'error_special', active: /[!@#$%^&*()_+]/.test(data), text: t('error_special') },
      { id: 'error_upper', active: /[A-Z]/.test(data), text: t('error_upper') },
      { id: 'error_lower', active: /[a-z]/.test(data), text: t('error_lower') },
      { id: 'error_number', active: /[0-9]/.test(data), text: t('error_number') },
    ]
    return _list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, watch('password')])

  return (
    <>
      <LayoutUnAuth title="Sign Up">
        {!isSuccess ? (
          <FormSignUp
            control={control}
            handleSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            redirectSignIn={redirectSignIn}
            listTextValidate={list_text_validate}
          />
        ) : null}

        {isSuccess ? <Success redirectSignIn={redirectSignIn} /> : null}
      </LayoutUnAuth>
    </>
  )
}

export { SignUp }
