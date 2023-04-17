import {
  Avatar as MuiAvatar,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  styled,
} from '@mui/material'
import { Stack } from '@mui/system'

const Avatar = styled(MuiAvatar)({
  width: 28,
  height: 28,
})

const Menu = styled(MuiMenu)({
  '.MuiMenu-paper': {
    overflow: 'visible',
    boxShadow: '0px 2px 40px rgba(17, 17, 17, 0.08)',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  '.MuiList-root': {
    paddingBottom: 0,
    paddingTop: 0,
  },
})

const StackName = styled(Stack)({
  alignItems: 'center',
  cursor: 'pointer',
})

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  height: theme.spacing(6.75),
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.common.black,
}))

export { Avatar, Menu, StackName, MenuItem }
