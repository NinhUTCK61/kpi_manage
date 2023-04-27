import { CustomImage } from '@/features/auth/components'
import styled from '@emotion/styled'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ICON from '/public/assets/svgs/icon_stroke.svg'

type ModalActionTypes = {
  image: File[]
  isOpen: boolean
  onClose: () => void
}

const ModalAction: React.FC<ModalActionTypes> = ({ image, isOpen, onClose }) => {
  const [thumb, setThumb] = useState<(File & { preview: string })[]>([])

  useEffect(() => {
    setThumb(
      image.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [image])

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
            <BoxImage>
              {thumb.map((item) => (
                <CustomImage
                  key={item.name}
                  src={item.preview}
                  alt={item.name}
                  width={200}
                  height={200}
                  onLoad={() => {
                    URL.revokeObjectURL(item.preview)
                  }}
                />
              ))}
            </BoxImage>
          </Stack>
          <Stack flexDirection="row">
            <Button
              variant="outlined"
              fullWidth
              sx={{ marginRight: '12px' }}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button variant="contained" fullWidth sx={{ marginLeft: '12px' }}>
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
})

const BoxImage = styled(Stack)({
  width: 268,
  height: 206,
  justifyContent: 'center',
  borderRadius: '12px',
  background: '#D9D9D9',
})

export default ModalAction
