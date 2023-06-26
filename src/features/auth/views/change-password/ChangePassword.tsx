import { api } from '@/libs/api'
import { ChangePasswordInputSchema, ChangePasswordType } from '@/libs/schema'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormChangePassword } from './FormChangePassword'

const ChangePassword: FC = () => {
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
    <Layout title={t('seo_title')}>
      <Box width={450}>
        <Typography variant="h3" fontWeight="700" textTransform="uppercase" mb={3}>
          {t('seo_title')}
        </Typography>

        <FormChangePassword
          isLoading={isLoading}
          control={control}
          handleSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </Layout>
  )
}

export { ChangePassword }
