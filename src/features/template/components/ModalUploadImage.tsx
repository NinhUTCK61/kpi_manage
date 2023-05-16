import { CustomImage } from '@/features/auth/components'
import { api } from '@/libs/api'
import { Box, Button, CircularProgress, Modal, Stack, Typography, styled } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import closeIcon from '/public/assets/svgs/close.svg'

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
  const utils = api.useContext()
  const { t } = useTranslation(['home'])

  useEffect(() => {
    if (image && image.length > 0 && image[0]) {
      const url = URL.createObjectURL(image[0])
      setPreviewURL(url)
      setNameImage(image[0]?.name)
    }
  }, [image])

  const { mutate: mutateTemplate } = api.template.update.useMutation({
    onSuccess() {
      enqueueSnackbar({
        variant: 'success',
        message: t('upload_success'),
      })
      onCloseModalUploadImage()
      setPreviewURL('')
    },
    onError() {
      enqueueSnackbar({
        variant: 'error',
        message: t('upload_fail'),
      })
    },
    onSettled: () => {
      utils.template.list.invalidate()
    },
  })
  const { data, mutateAsync } = api.utils.createPreSignUrl.useMutation()

  const mutation = useMutation({
    mutationFn: (url: string) => {
      return fetch(url, {
        method: 'PUT',
        body: image[0],
      })
    },
    onSuccess: () => {
      mutateTemplate({
        id: idTemplate,
        image_url: `template/${idTemplate}.${nameImage.split('.').pop()}`,
      })
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
    <Modal open={isOpen} onClose={handelCloseModalUploadImage}>
      <BoxContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize="18px" lineHeight="28px">
            {t('upload_title')}
          </Typography>

          <CloseButton onClick={handelCloseModalUploadImage}>
            <CustomImage alt="icon" src={closeIcon} sx={{ mb: 0 }} />
          </CloseButton>
        </Stack>

        <Typography mt={1} fontSize="14px" fontWeight="20px">
          {t('upload_question')}
        </Typography>

        <Stack direction="row" justifyContent="center" my={3}>
          <ImagePreview>
            {previewURL && (
              <CustomImage
                key={nameImage}
                src={previewURL}
                alt={nameImage}
                width={286}
                height={206}
                style={{ marginBottom: 0 }}
                onLoad={() => {
                  URL.revokeObjectURL(previewURL)
                }}
              />
            )}
          </ImagePreview>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="text" fullWidth onClick={onReturnUpload}>
            {t('cancel')}
          </Button>

          <Button variant="contained" fullWidth onClick={handleUploadImage}>
            {mutation.isLoading ? <CircularProgress size="1.2rem" /> : t('ok')}
          </Button>
        </Stack>
      </BoxContainer>
    </Modal>
  )
}

const BoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: theme.shadows[1],
  padding: 24,
  borderRadius: '12px',
  background: theme.palette.base.white,
}))

const CloseButton = styled(Button)({
  ':hover': {
    color: 'inherit',
  },
  padding: 0,
  minWidth: 0,
})

const ImagePreview = styled(Stack)(({ theme }) => ({
  width: 268,
  height: 206,
  justifyContent: 'center',
  borderRadius: '12px',
  background: theme.palette.base.gray,
  overflow: 'hidden',
}))

export { ModalUploadImage }
