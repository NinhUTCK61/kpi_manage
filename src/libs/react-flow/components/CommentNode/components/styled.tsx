import { Box, Button, InputBase, Popover, Stack, styled } from '@mui/material'

const CommentFormContainer = styled(Popover)({
  '.MuiPopover-paper': {
    boxShadow: 'none',
  },
  overflowY: 'scroll',
})

const IconStyled = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  background: theme.palette.customPrimary[0],
  width: 40,
  height: 40,
  padding: 9,
  borderRadius: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}))

const BoxComment = styled(Box)(({ theme }) => ({
  width: 400,
  background: theme.palette.trueGrey[50],
  position: 'relative',
}))

const HeaderComment = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  borderBottom: `1px solid ${theme.palette.greyScale[300]}`,
  padding: '0 16px',
  height: 56,
}))

const CommentReplyContainer = styled(Stack)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.greyScale[300]}`,
  height: 80,
  padding: 16,
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

const ButtonSend = styled(Button)({
  position: 'absolute',
  padding: 0,
  right: 16,
  minWidth: 0,
  top: '50%',
  transform: 'translateY(-50%)',
})

const InputStyled = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '13px 40px 13px 16px',
    ...theme.typography.body2,
    background: theme.palette.trueGrey[100],
    color: theme.palette.base.black,
    borderRadius: 12,
  },
}))

const ButtonAction = styled(Button)({
  minWidth: 0,
  padding: 0,
})

const CommentActive = styled(CommentFormContainer)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.greyScale[100],
  },
  marginLeft: 8,
  marginTop: 36,
}))

export {
  IconStyled,
  BoxComment,
  HeaderComment,
  CommentReplyContainer,
  InputStyled,
  MenuComment,
  ButtonSend,
  CommentFormContainer,
  ButtonAction,
  CommentActive,
}
