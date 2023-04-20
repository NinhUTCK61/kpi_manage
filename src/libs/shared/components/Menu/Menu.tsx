import { Menu as MuiMenu, MenuItem as MuiMenuItem, styled } from '@mui/material'

const Menu = styled(MuiMenu)({
  '.MuiMenu-paper': {
    overflow: 'hidden',
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

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  height: theme.spacing(6.75),
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.common.black,
  ':hover': {
    backgroundColor: theme.palette.customPrimary[0],
  },
}))

export { Menu, MenuItem }
