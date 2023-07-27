import { api } from '@/libs/api'
import { UserProfile, UserProfileType } from '@/libs/schema/profile'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Typography, styled } from '@mui/material'
import { useSession } from 'next-auth/react'
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
  const { data } = api.profile.me.useQuery()
  const utils = api.useContext()
  const { update } = useSession()
  const [isEdit, setEdit] = useState(false)
  const [image, setImage] = useState<File[] | null>()

  const { control, handleSubmit, reset } = useForm<UserProfileType>({
    defaultValues: {
      name: '',
      first_name: '',
      email: '',
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
      onSuccess(data) {
        enqueueSnackbar(t('update_profile_success'), {
          variant: 'success',
        })

        update({ name: data.name })
        setEdit(false)
      },
      onError(error) {
        enqueueSnackbar(t(error.message, { ns: 'common' }), {
          variant: 'error',
        })
      },
      onSettled() {
        utils.profile.me.invalidate()
      },
    })
  }

  const onSelectImage = (_acceptedFiles: File[]) => {
    if (handleValidateFormatImage(_acceptedFiles)) setImage(_acceptedFiles)
  }

  const onCloseModal = () => {
    setImage(null)
  }

  function handleValidateFormatImage(_acceptedFiles: File[]) {
    if (!_acceptedFiles.length) {
      enqueueSnackbar(t('incorrect_upload_image'), {
        variant: 'error',
      })
      return false
    }
    if (_acceptedFiles[0]?.size && Math.floor(_acceptedFiles[0]?.size / (1024 * 1024)) > 3) {
      enqueueSnackbar(t('error_size_image_upload'), {
        variant: 'error',
      })
      return false
    }
    return true
  }

  return (
    <Layout title={t('seo_title')}>
      <Title>{t('seo_title')}</Title>

      <BackgroundProfile onDrop={onSelectImage} />

      <ModalUploadImage image={image || []} onCloseModal={onCloseModal} />

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

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: 700,
  textTransform: 'uppercase',
  marginBottom: 24,
  [theme.breakpoints.down('sm')]: {
    fontWeight: 600,
    fontSize: 19,
    lineHeight: '26px',
    marginBottom: 16,
  },
}))
