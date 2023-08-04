import { AppBar as MuiAppBar, styled } from '@mui/material'
import { HEADER_HEIGHT, HEADER_MOBILE_HEIGHT } from './Header'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: HEADER_HEIGHT,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
  [theme.breakpoints.down('sm')]: {
    height: HEADER_MOBILE_HEIGHT,
  },
}))

export { AppBar }
