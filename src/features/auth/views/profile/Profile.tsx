import { api } from '@/libs/api'
import { UserProfile, UserProfileType } from '@/libs/schema/profile'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormProfile } from './FormProfile'

export const Profile = () => {
  const { t } = useTranslation('profile')
  const { mutate, isLoading } = api.profile.update.useMutation()
  const { data } = api.profile.get.useQuery()
  const [edit, setEdit] = useState(false)

  const { control, handleSubmit } = useForm<UserProfileType>({
    values: data,
    resolver: zodResolver(UserProfile),
  })

  const handleOpenEdit = () => {
    setEdit(true)
  }

  const handleCloseEdit = () => {
    setEdit(false)
  }

  const onSubmit: SubmitHandler<UserProfileType> = (data) => {
    mutate(data, {
      onSuccess() {
        enqueueSnackbar('Update success', {
          variant: 'success',
        })
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
      <Typography variant="h3" fontWeight="700" textTransform="uppercase" mb={3}>
        {t('seo_title')}
      </Typography>

      <FormProfile
        isLoading={isLoading}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        handleOpenEdit={handleOpenEdit}
        handleCloseEdit={handleCloseEdit}
        edit={edit}
      />
    </Layout>
  )
}
