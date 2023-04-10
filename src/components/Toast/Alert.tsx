import { Alert as MuiAlert, styled } from '@mui/material'

const Alert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  '& .MuiAlert-message': {
    padding: 0,
  },
  backgroundColor: theme.palette.red[0],
}))
export { Alert }
