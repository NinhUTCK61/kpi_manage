import { AlertColor, AlertTitle, Snackbar, SnackbarProps, Typography } from '@mui/material'
import { Alert } from './Alert'

type ToastTypes = {
  state: StateToast
  handleClose(): void
} & SnackbarProps

type StateToast = {
  open: boolean
  title: string
  description: string
  type: AlertColor
}

const Toast: React.FC<ToastTypes> = ({
  state: { open, type, title, description },
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      sx={{
        border: (theme) => `1px solid ${theme.palette.red[600]}`,
        borderRadius: 2,
      }}
    >
      <Alert onClose={handleClose} severity={type}>
        <AlertTitle color="red.600" sx={{ fontWeight: 600 }}>
          {title}
        </AlertTitle>
        <Typography color="red.500" variant="body2" maxWidth={527}>
          {description}
        </Typography>
      </Alert>
    </Snackbar>
  )
}

export { Toast, type StateToast }
