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
import { useDropzone } from 'react-dropzone'
import { DialogBaseProps } from '../../types/utils'

type DialogThumbnailTypes = DialogBaseProps<{
  onDrop: (file: File[]) => void
}>

const DialogThumbnail: React.FC<DialogThumbnailTypes> = ({ open, handleClose, onDrop }) => {
  const { t } = useTranslation()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg'],
    },
    multiple: false,
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent {...getRootProps()}>
        <Stack direction="row" justifyContent="center" mb={1.5}>
          <Image src={ThumbnailIcon} alt="delete" />
        </Stack>

        <Stack>
          <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center" mb={0.5}>
            <TextColorCustom alignSelf="center" variant="body2">
              {t('dialog.thumbnail.click_to_upload')}
            </TextColorCustom>
            <Typography color="greyScale.600" variant="body2">
              {t('dialog.thumbnail.detail_set_thumbnail_1')}
            </Typography>
          </Stack>
          <Stack>
            <Typography color="greyScale.600" variant="caption" textAlign="center">
              {t('dialog.thumbnail.detail_set_thumbnail_2')}
            </Typography>
          </Stack>
          <input {...getInputProps()} />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

const TextColorCustom = styled(Typography)(({ theme }) => ({
  color: theme.palette.customPrimary[700],
  fontWeight: 600,
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
