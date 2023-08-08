import { greyScale } from '@/libs/config/theme'
import { DialogBaseProps } from '@/libs/shared/types/utils'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const DialogWarning: React.FC<DialogBaseProps> = ({ open, handleClose }) => {
  const { t } = useTranslation('home')

  return (
    <Dialog
      open={open}
      PaperProps={{
        elevation: 2,
        sx: {
          p: 2,
          width: 360,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          mb: 2,
        }}
      >
        <Typography color={greyScale[900]}>{t('dialog_warning.description')}</Typography>
      </DialogContent>

      <DialogActions sx={{ p: 0, mb: 1 }}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { DialogWarning }
