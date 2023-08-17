import { api } from '@/libs/api'
import { useValidateImage } from '@/libs/hooks'
import { UserProfile, UserProfileType } from '@/libs/schema/profile'
import { Layout } from '@/libs/shared/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Title } from '../styled'
import { BackgroundProfile } from './BackgroundProfile'
import { FormProfile } from './FormProfile'
import { ModalUploadImage } from './ModalUploadImage'

export const Profile = () => {
  const { t } = useTranslation(['profile', 'meta'])
  const { mutate, isLoading } = api.profile.update.useMutation()
  const { data } = api.profile.me.useQuery()
  const utils = api.useContext()
  const { update } = useSession()
  const [isEdit, setEdit] = useState(false)
  const [image, setImage] = useState<File[] | null>()
  const { handleValidateFormatImage } = useValidateImage()

  const { control, handleSubmit, reset } = useForm<UserProfileType>({
    defaultValues: {
      name: data?.name,
      first_name: data?.first_name,
      email: data?.email,
      company_name: data?.company_name,
      role_in_company: data?.role_in_company,
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
        utils.node.list.reset()
      },
    })
  }

  const onSelectImage = (_acceptedFiles: File[]) => {
    if (handleValidateFormatImage(_acceptedFiles)) setImage(_acceptedFiles)
  }

  const onCloseModal = () => {
    setImage(null)
  }

  return (
    <>
      <Title>{t('profile.title', { ns: 'meta' })}</Title>

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
    </>
  )
}

Profile.getLayout = (page: ReactElement) => <Layout title="profile.title">{page}</Layout>
