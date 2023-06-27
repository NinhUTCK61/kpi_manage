import { api } from '@/libs/api'
import { UserProfile, UserProfileType } from '@/libs/schema/profile'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { BackgroundProfile } from './BackgroundProfile'
import { FormProfile } from './FormProfile'
import { ModalUploadImage } from './ModalUploadImage'

export const Profile = () => {
  const { t } = useTranslation('profile')
  const { mutate, isLoading } = api.profile.update.useMutation()
  const { data } = api.profile.get.useQuery()
  const [isEdit, setEdit] = useState(false)
  const [image, setImage] = useState<File[] | null>()

  const { control, handleSubmit, reset } = useForm<UserProfileType>({
    defaultValues: {
      name: '',
      first_name: '',
      email: '',
      image: '',
      company_name: '',
      role_in_company: '',
    },
    values: data,
    resolver: zodResolver(UserProfile),
  })

  const handleOpenEdit = () => {
    setEdit(true)
  }

  const handleCancelEdit = () => {
    setEdit(false)
    reset(data)
  }

  const onSubmit: SubmitHandler<UserProfileType> = (data) => {
    mutate(data, {
      onSuccess() {
        enqueueSnackbar(t('update_profile_success'), {
          variant: 'success',
        })

        setEdit(false)
      },
      onError(error) {
        enqueueSnackbar(t(error.message, { ns: 'common' }), {
          variant: 'error',
        })
      },
    })
  }

  const onSelectImage = (_acceptedFiles: File[]) => {
    setImage(_acceptedFiles)
  }

  const onCloseModal = () => {
    setImage(null)
  }

  return (
    <Layout title={t('seo_title')}>
      <Typography variant="h3" fontWeight="700" textTransform="uppercase" mb={3}>
        {t('seo_title')}
      </Typography>

      <BackgroundProfile onDrop={onSelectImage} />

      <ModalUploadImage image={image || []} isOpen={!!image} onCloseModal={onCloseModal} />

      <FormProfile
        isLoading={isLoading}
        control={control}
        handleSubmit={handleSubmit(onSubmit)}
        handleOpenEdit={handleOpenEdit}
        handleCancelEdit={handleCancelEdit}
        isEdit={isEdit}
      />
    </Layout>
  )
}
