import { TextColor } from '@/libs/shared/components'
import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ThumbnailIcon from 'public/assets/svgs/thumbnail.svg'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type DialogThumbnailTypes = {
  open: boolean
  handleClose(): void
  handleConfirm(): void
}

const DialogThumbnail: React.FC<DialogThumbnailTypes> = ({ open, handleClose, handleConfirm }) => {
  const { t } = useTranslation('home')
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log({ acceptedFiles })
      handleConfirm()
    },
    [handleConfirm],
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent {...getRootProps()}>
        <Stack direction="row" justifyContent="center" mb={1.5}>
          <Image src={ThumbnailIcon} alt="delete" />
        </Stack>

        <Stack>
          <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center" mb={0.5}>
            <TextColorCustom alignSelf="center">{t('click_to_upload')}</TextColorCustom>
            <Typography color="greyScale.600" variant="body2">
              {t('detail_set_thumbnail_1')}
            </Typography>
          </Stack>
          <Stack>
            <Typography color="greyScale.600" variant="caption" textAlign="center">
              {t('detail_set_thumbnail_2')}
            </Typography>
          </Stack>
          <input {...getInputProps()} />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

const TextColorCustom = styled(TextColor)(({ theme }) => ({
  color: theme.palette.customPrimary[700],
}))

const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 12,
    padding: theme.spacing(2, 3),
  },
}))

const DialogContent = styled(MuiDialogContent)({
  width: 512,
  p: 0,
  cursor: 'pointer',
})
export { DialogThumbnail }
