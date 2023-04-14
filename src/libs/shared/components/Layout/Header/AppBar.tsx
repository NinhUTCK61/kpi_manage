import { AppBar as MuiAppBar, styled } from '@mui/material'
import { HEIGHT_HEADER } from './Header'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: HEIGHT_HEADER,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
}))

export { AppBar }
