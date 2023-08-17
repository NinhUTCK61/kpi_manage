import { api } from '@/libs/api'
import { ChangePasswordInputSchema, ChangePasswordType } from '@/libs/schema'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Title } from '../styled'
import { FormChangePassword } from './FormChangePassword'

const ChangePassword = () => {
  const { t } = useTranslation(['change_password', 'common'])
  const { mutate, isLoading } = api.auth.changePassword.useMutation()

  const { control, handleSubmit, reset } = useForm<ChangePasswordType>({
    defaultValues: {
      'old-password': '',
      'new-password': '',
      'confirm-new-password': '',
    },
    resolver: zodResolver(ChangePasswordInputSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordType> = (data) => {
    mutate(data, {
      onSuccess() {
        reset({ 'old-password': '', 'new-password': '', 'confirm-new-password': '' })
        enqueueSnackbar(t('change_password_success'), { variant: 'success' })
      },
      onError(error) {
        enqueueSnackbar(t(error.message, { ns: 'common' }), {
          variant: 'error',
        })
      },
    })
  }

  return (
    <Box width={{ xs: '100%', sm: 450 }}>
      <Title>{t('title')}</Title>

      <FormChangePassword
        isLoading={isLoading}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
      />
    </Box>
  )
}

ChangePassword.getLayout = (page: ReactElement) => (
  <Layout title="change_password.title">{page}</Layout>
)

export { ChangePassword }
