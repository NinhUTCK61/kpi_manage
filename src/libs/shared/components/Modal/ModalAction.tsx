import { CustomImage } from '@/features/auth/components'
import { api } from '@/libs/api'
import styled from '@emotion/styled'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import ICON from '/public/assets/svgs/icon_stroke.svg'

type ModalActionTypes = {
  image: File[]
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  idTemplate: string
}

const ModalAction: React.FC<ModalActionTypes> = ({
  image,
  isOpen,
  onClose,
  onOpen,
  idTemplate,
}) => {
  const KEY_IMAGE = `template/${idTemplate}.${image[0]?.name}`
  const [previewURL, setPreviewURL] = useState('')
  const [nameImage, setNameImage] = useState('')

  useEffect(() => {
    if (image && image.length > 0 && image[0]) {
      const url = URL.createObjectURL(image[0])
      setPreviewURL(url)
      setNameImage(image[0]?.name)
    }
  }, [image])

  const { data } = api.utils.createPresignUrl.useQuery(
    {
      key: KEY_IMAGE,
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

  async function handleUploadImage(data: string, image: File | undefined) {
    try {
      axios({
        method: 'put',
        url: data,
        data: image,
      }).then(function () {
        mutate(
          {
            id: idTemplate,
            image_url: `template/${idTemplate}.${nameImage}`,
          },
          {
            onSuccess() {
              enqueueSnackbar({
                variant: 'success',
                message: 'Upload image success!',
              })
              onClose()
            },
            onError(error) {
              enqueueSnackbar(error.message, {
                variant: 'error',
              })
            },
          },
        )
      })
    } catch (error) {
      enqueueSnackbar({
        message: 'Upload image failed!',
        variant: 'error',
      })
    }
  }

  const onReturnUpload = () => {
    onClose(), onOpen()
  }

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600} fontSize="18px" lineHeight="28px">
              Set thumbnail for this file?
            </Typography>
            <CloseButton onClick={() => onClose()}>
              <CustomImage alt="icon" src={ICON} sx={{ mb: 0 }} />
            </CloseButton>
          </Stack>
          <Typography mt={1}>Are you sure to upload this photo?</Typography>
          <Stack flexDirection="row" justifyContent="center" marginY={3}>
            <ImagePreview>
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
            </ImagePreview>
          </Stack>
          <Stack flexDirection="row">
            <Button variant="text" fullWidth sx={{ marginRight: '8px' }} onClick={onReturnUpload}>
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginLeft: '8px' }}
              onClick={() => handleUploadImage(data as string, image[0])}
            >
              Ok
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '12px',
}

const CloseButton = styled(Button)({
  ':hover': {
    color: 'inherit',
  },
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 0,
  minWidth: 0,
})

const ImagePreview = styled(Stack)({
  width: 268,
  height: 206,
  justifyContent: 'center',
  borderRadius: '12px',
  background: '#D9D9D9',
  overflow: 'hidden',
})

export default ModalAction
