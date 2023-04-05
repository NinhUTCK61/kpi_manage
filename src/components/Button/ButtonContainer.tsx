import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const ButtonContainer = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
  fontSize: 15,
  lineHeight: '22px',
  backgroundColor: theme.palette.customPrimary[700],
  ':hover': {
    backgroundColor: theme.palette.customPrimary[800],
  },
  ':focus': {
    backgroundColor: theme.palette.customPrimary[900],
  },
  ':disabled': {
    backgroundColor: theme.palette.customPrimary[0],
    color: theme.palette.common.white,
  },
}))

export { ButtonContainer }
