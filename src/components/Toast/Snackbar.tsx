import { Snackbar as MuiSnackbar, styled } from '@mui/material'

const Snackbar = styled(MuiSnackbar)(({ theme }) => ({
  border: `1px solid ${theme.palette.red[600]}`,
  borderRadius: 8,
  top: `${theme.spacing(5)} !important`,
}))

export { Snackbar }
