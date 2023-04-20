import { DialogActionType, DialogBaseProps } from '@/libs/shared/types/utils'
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
import WarningIcon from 'public/assets/svgs/warning.svg'

type DialogActionTypes = DialogBaseProps<{
  handleConfirm(): void
  title?: string
  description?: string
  type: DialogActionType
  textSubmit?: string
}>

const DialogAction: React.FC<DialogActionTypes> = ({
  open,
  handleClose,
  title,
  description,
  handleConfirm,
  type = 'default',
  textSubmit,
}) => {
  const { t } = useTranslation()
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 2,
      }}
    >
      <DialogContent
        sx={{
          width: 400,
          p: 0,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          {...(type !== 'default' && { mb: 2 })}
          position="relative"
        >
          {type !== 'default' && (
            <Image src={type == 'delete' ? DeleteIcon : WarningIcon} alt="delete" />
          )}
          <Image
            src={CloseIcon}
            alt="close"
            onClick={handleClose}
            style={{ cursor: 'pointer', position: 'absolute', top: 0, right: 0 }}
          />
        </Stack>
        {title && <TitleDiaLog>{title}</TitleDiaLog>}
        {description && <DescriptionDiaLog>{description}</DescriptionDiaLog>}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose} sx={{ width: 168 }}>
          {t('dialog.cancel')}
        </Button>
        <Button variant="contained" onClick={handleConfirm} autoFocus sx={{ width: 168 }}>
          {textSubmit ? textSubmit : t('dialog.submit')}
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
export { DialogAction }
