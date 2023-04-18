import { ImagePointer } from '@/features/auth/components'
import {
  Button,
  DialogContent,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import DeleteIcon from 'public/assets/svgs/delete.svg'

type DialogDeleteTypes = {
  open: boolean
  handleClose(): void
  handleConfirm(): void
}

const DialogDelete: React.FC<DialogDeleteTypes> = ({ open, handleClose, handleConfirm }) => {
  const { t } = useTranslation('home')
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent
        sx={{
          width: 400,
          p: 0,
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Image src={DeleteIcon} alt="delete" />
          <ImagePointer src={CloseIcon} alt="close" onClick={handleClose} />
        </Stack>
        <TitleDiaLog>{t('delete_file')}</TitleDiaLog>
        <DescriptionDiaLog>{t('detail_dialog_delete')}</DescriptionDiaLog>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose} sx={{ width: 168 }}>
          {t('cancel')}
        </Button>
        <Button variant="contained" onClick={handleConfirm} autoFocus sx={{ width: 168 }}>
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const TitleDiaLog = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  lineHeight: '28px',
  color: theme.palette.base.black,
  marginBottom: theme.spacing(1),
}))

const DescriptionDiaLog = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '20px',
  color: theme.palette.grey[600],
  marginBottom: theme.spacing(2),
}))

const DialogActions = styled(MuiDialogActions)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 0,
})

const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 12,
    padding: theme.spacing(3),
  },
}))
export { DialogDelete }
