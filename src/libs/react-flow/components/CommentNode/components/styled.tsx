import { Box, Button, InputBase, Menu as MuiMenu, Stack, styled } from '@mui/material'

const Menu = styled(MuiMenu)({
  '.MuiMenu-paper': {
    boxShadow: 'none',
  },
})

const IconCommentImage = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  background: theme.palette.customPrimary[0],
  width: 40,
  height: 40,
  padding: '9px',
  borderRadius: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const BoxComment = styled(Box)(({ theme }) => ({
  width: 400,
  background: theme.palette.trueGrey[50],
}))

const HeaderComment = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.greyScale[300]}`,
  padding: '0 16px',
  height: '56px',
}))

const InputCommentStyle = styled(Stack)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.greyScale[300]}`,
  height: 80,
  padding: 16,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const MenuComment = styled(Stack)(({ theme }) => ({
  color: theme.palette.base.white,
  background: theme.palette.base.black,
  width: 131,
  padding: '12px 16px',
  position: 'absolute',
  zIndex: 2,
  borderRadius: 4,
  '::before': {
    content: '""',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: `20px solid ${theme.palette.base.black}`,
    position: 'absolute',
    top: -12,
    left: 12,
    zIndex: 1,
  },
}))

const InputStyle = styled(InputBase)(({ theme }) => ({
  ...theme.typography.body2,
  background: theme.palette.trueGrey[100],
  color: theme.palette.base.black,
  borderRadius: 12,
  padding: '16px 0',
  height: '48px',
}))

const ButtonSendComment = styled(Button)(({ theme }) => ({
  position: 'absolute',
  padding: 0,
  right: 16,
  minWidth: 0,
  top: '50%',
  transform: 'translateY(-50%)',
}))

const InputComment = styled(InputBase)(({ theme }) => ({
  ...theme.typography.body2,
  background: theme.palette.trueGrey[100],
  color: theme.palette.base.black,
  borderRadius: 12,
  padding: '12px 16px',
  height: '48px',
  width: 382,
}))

export {
  IconCommentImage,
  BoxComment,
  HeaderComment,
  InputCommentStyle,
  MenuComment,
  InputStyle,
  ButtonSendComment,
  Menu,
  InputComment,
}
