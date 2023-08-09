import { greyScale } from '@/libs/config/theme'
import { useMatchesSize } from '@/libs/hooks'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

const DialogWarning = () => {
  const { t } = useTranslation('file')
  const [openDialog, setOpenDialog] = useState(false)
  const { isDownLarge } = useMatchesSize()

  useEffect(() => {
    setOpenDialog(isDownLarge)
  }, [isDownLarge])

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
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
        <Typography color={greyScale[900]} textAlign="center" fontWeight="bold">
          {t('dialog_warning.description')}
        </Typography>
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
