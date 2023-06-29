import { api } from '@/libs/api'
import { ModalUpload } from '@/libs/shared/components'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useUpdateImageTemplate } from '../hooks'

type ModalUploadImageTypes = {
  image: File[]
  isOpen: boolean
  onCloseModalUploadImage: () => void
  onCloseDialogThumbnail: () => void
  onOpenDialogThumbnail: () => void
  idTemplate: string
}

const ModalUploadImage: React.FC<ModalUploadImageTypes> = ({
  image,
  isOpen,
  onCloseModalUploadImage,
  onCloseDialogThumbnail,
  onOpenDialogThumbnail,
  idTemplate,
}) => {
  const [previewURL, setPreviewURL] = useState('')
  const [nameImage, setNameImage] = useState('')
  const { data, mutateAsync } = api.utils.createPreSignUrl.useMutation()
  const { mutate: mutateTemplate } = useUpdateImageTemplate()
  const { t } = useTranslation(['home'])

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
      mutateTemplate(
        {
          id: idTemplate,
          image_url: `template/${idTemplate}.${nameImage.split('.').pop()}`,
        },
        {
          onSuccess() {
            onCloseModalUploadImage()
            setPreviewURL('')
          },
        },
      )
    },
    onError: () => {
      enqueueSnackbar({
        variant: 'error',
        message: t('upload_fail'),
      })
    },
  })

  const handleUploadImage = async () => {
    const key = `template/${idTemplate}.${image[0]?.name.split('.').pop()}`

    if (data && data?.key === key && data.expires > Date.now() + 600) {
      mutation.mutate(data.url)
    } else {
      const res = await mutateAsync({
        key,
      })
      mutation.mutate(res.url)
    }
  }

  const handelCloseModalUploadImage = () => {
    onCloseDialogThumbnail()
    onCloseModalUploadImage()
    setPreviewURL('')
  }

  const onReturnUpload = () => {
    handelCloseModalUploadImage()
    onOpenDialogThumbnail()
  }

  return (
    <ModalUpload
      title={t('upload_title')}
      description={t('upload_question')}
      previewURL={previewURL}
      handleUploadImage={handleUploadImage}
      handleCloseUpload={handelCloseModalUploadImage}
      nameImage={nameImage}
      onReturnUpload={onReturnUpload}
      isLoading={mutation.isLoading}
    />
  )
}

export { ModalUploadImage }
