import { CustomImage } from '@/features/auth/components'
import { api } from '@/libs/api'
import { Box, Button, Modal, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import closeIcon from '/public/assets/svgs/icon_stroke.svg'

type ModalUploadImageTypes = {
  image: File[]
  isOpen: boolean
  onCloseModalUploadImage: () => void
  onOpenDialogThumbnail: () => void
  idTemplate: string
}

const ModalUploadImage: React.FC<ModalUploadImageTypes> = ({
  image,
  isOpen,
  onCloseModalUploadImage,
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

  const { data } = api.utils.createPresignUrl.useQuery(
    {
      key: `template/${idTemplate}`,
    },
    {
      onError(error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        })
      },
    },
  )
  const { mutate } = api.template.update.useMutation()

  async function handleUploadImage(url: string, image: File | undefined) {
    fetch(url, {
      method: 'PUT',
      body: image,
    })
      .then(() => {
        mutate(
          {
            id: idTemplate,
            image_url: `template/${idTemplate}.${nameImage}`,
          },
          {
            onSuccess() {
              enqueueSnackbar({
                variant: 'success',
                message: t('upload_success'),
              })
              onCloseModalUploadImage()
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
          },
        )
      })
      .catch(() => {
        enqueueSnackbar({
          variant: 'error',
          message: t('upload_fail'),
        })
      })
  }

  const onReturnUpload = () => {
    onCloseModalUploadImage() // close modal upload,
    onOpenDialogThumbnail() // open dialog choose image
  }

  return (
    <Modal open={isOpen} onClose={onCloseModalUploadImage}>
      <BoxContainer>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600} fontSize="18px" lineHeight="28px">
            {t('upload_title')}
          </Typography>
          <CloseButton onClick={() => onCloseModalUploadImage()}>
            <CustomImage alt="icon" src={closeIcon} sx={{ mb: 0 }} />
          </CloseButton>
        </Stack>

        <Typography fontSize={14} lineHeight="20px" mt={1}>
          {t('upload_question')}
        </Typography>

        <Stack flexDirection="row" justifyContent="center" marginY={3}>
          <ImagePreview>
            {previewURL && (
              <CustomImage
                key={nameImage}
                src={previewURL}
                alt={nameImage}
                width={286}
                height={206}
                style={{ objectFit: 'cover', marginBottom: 0 }}
                onLoad={() => {
                  URL.revokeObjectURL(previewURL)
                }}
              />
            )}
          </ImagePreview>
        </Stack>

        <Stack flexDirection="row" spacing={1}>
          <Button variant="text" fullWidth onClick={onReturnUpload}>
            {t('cancel')}
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleUploadImage(data as string, image[0])}
          >
            {t('ok')}
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
  boxShadow: theme.shadows[2],
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
