import { api } from '@/libs/api'
import { ModalUpload } from '@/libs/shared/components'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useUpdateImageProfile } from './hooks'

type ModalUploadImageTypes = {
  image: File[]
  onCloseModal: () => void
}

const ModalUploadImage: React.FC<ModalUploadImageTypes> = ({ image, onCloseModal }) => {
  const [previewURL, setPreviewURL] = useState('')
  const [nameImage, setNameImage] = useState('')
  const { data: session, update } = useSession()
  const { mutate: mutateProfile } = useUpdateImageProfile()
  const { data, mutateAsync } = api.utils.createPreSignUrl.useMutation()
  const { mutateAsync: mutateDeleteImage } = api.utils.deleteImage.useMutation()
  const { t } = useTranslation('profile')

  useEffect(() => {
    if (image && image.length > 0 && image[0]) {
      const url = URL.createObjectURL(image[0])
      setPreviewURL(url)
      setNameImage(image[0]?.name)
    }
  }, [image])

  const mutation = useMutation({
    mutationFn: (url: string) => {
      return fetch(url, {
        method: 'PUT',
        body: image[0],
      })
    },
    onSuccess: () => {
      mutateProfile(
        {
          image: `profile/${session?.user.id}${image[0]?.lastModified}.${nameImage
            .split('.')
            .pop()}`,
        },
        {
          onSuccess(data) {
            setPreviewURL('')
            onCloseModal()
            mutateDeleteImage({ key: session?.user.image as string })
            update({ image: data.image })
          },
        },
      )
    },
    onError: () => {
      enqueueSnackbar({
        variant: 'error',
        message: t('modal_upload.upload_fail'),
      })
    },
  })

  const handleUploadImage = async () => {
    const key = `profile/${session?.user.id}${image[0]?.lastModified}.${image[0]?.name
      .split('.')
      .pop()}`

    if (data && data?.key === key && data.expires > Date.now() + 600) {
      mutation.mutate(data.url)
    } else {
      const res = await mutateAsync({
        key,
      })
      mutation.mutate(res.url)
    }
  }

  const handleCloseUpload = () => {
    onCloseModal()
    setPreviewURL('')
  }

  return (
    <ModalUpload
      title={t('modal_upload.title_1')}
      description={t('modal_upload.title_2')}
      isLoading={mutation.isLoading}
      handleUploadImage={handleUploadImage}
      handleCloseUpload={handleCloseUpload}
      previewURL={previewURL}
      nameImage={nameImage}
    />
  )
}

export { ModalUploadImage }
