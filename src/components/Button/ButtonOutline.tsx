import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const ButtonOutline = styled(Button)(({ theme }) => ({
  color: theme.palette.customPrimary[700],
  border: `1px solid ${theme.palette.customPrimary[700]}`,
  fontWeight: 600,
  fontSize: 15,
  lineHeight: '22px',
  backgroundColor: theme.palette.common.white,
  ':hover': {
    color: theme.palette.customPrimary[800],
    border: `1px solid ${theme.palette.customPrimary[800]}`,
  },
  ':focus': {
    color: theme.palette.customPrimary[900],
    border: `1px solid ${theme.palette.customPrimary[900]}`,
  },
  ':disabled': {
    color: theme.palette.customPrimary[0],
    border: `1px solid ${theme.palette.customPrimary[0]}`,
  },
}))

export { ButtonOutline }
