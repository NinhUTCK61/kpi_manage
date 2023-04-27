import { CustomImage } from '@/features/auth/components'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ICON from '/public/assets/svgs/icon_stroke.svg'

type ModalActionTypes = {
  files: File[]
  isOpen: boolean
}

const ModalAction: React.FC<ModalActionTypes> = ({ files, isOpen }) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const [thumb, setThumb] = useState<(File & { preview: string })[]>([])

  useEffect(() => {
    setThumb(
      files.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [files])

  return (
    <>
      <Modal open={isOpen}>
        <Box sx={style}>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600} fontSize="18px" lineHeight="28px">
              Set thumbnail for this file?
            </Typography>
            <Button sx={{ display: 'flex', justifyContent: 'flex-end' }} onClick={handleClose}>
              <CustomImage alt="icon" src={ICON} sx={{ mb: 0 }} />
            </Button>
          </Stack>
          <Typography mt={1}>Are you sure to upload this photo?</Typography>
          <Stack
            width={268}
            height={206}
            marginY={3}
            justifyContent="center"
            marginX="auto"
            borderRadius="12px"
            sx={{ background: '#D9D9D9' }}
          >
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
          </Stack>
          <Stack flexDirection="row">
            <Button variant="outlined" fullWidth sx={{ marginRight: '12px' }} onClick={handleClose}>
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

export default ModalAction
