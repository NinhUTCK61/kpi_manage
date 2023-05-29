import { greyScale, trueGrey } from '@/libs/config/theme'
import { Box, Button, ButtonBase, InputBase, Popover, Stack, styled } from '@mui/material'

const CommentFormContainer = styled(Popover)({
  '.MuiPopover-paper': {
    boxShadow: 'none',
    backgroundColor: 'inherit',
  },
  overflowY: 'scroll',
})

const CommentContainer = styled(Box)({
  width: 400,
  background: trueGrey[50],
  position: 'relative',
})

const HeaderComment = styled(Stack)({
  width: '100%',
  borderBottom: `1px solid ${greyScale[300]}`,
  padding: '0 16px',
  height: 56,
})

const CommentReplyContainer = styled(Stack)({
  borderTop: `1px solid ${greyScale[300]}`,
  padding: 16,
})

const InputStyled = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '13px 40px 13px 16px',
    ...theme.typography.body2,
    background: trueGrey[100],
    color: theme.palette.base.black,
    borderRadius: 12,
  },
  padding: 0,
}))

const ButtonAction = styled(Button)({
  minWidth: 0,
  padding: 0,
})

const ButtonSendContainer = styled(Stack)({
  height: 48,
  position: 'absolute',
  right: 16,
  bottom: 0,
})

const CommentActive = styled(CommentFormContainer)({
  '& .MuiPaper-root': {
    backgroundColor: greyScale[100],
  },
  marginLeft: 8,
  marginTop: 36,
})

const ButtonMenu = styled(ButtonBase)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.base.white,
  background: theme.palette.base.black,
  padding: '12px 16px',
  '&::hover': {
    background: theme.palette.base.black,
  },
}))

const BackgroundDefault = styled(Stack)({
  backgroundColor: greyScale[200],
  borderRadius: '100%',
})

export {
  CommentContainer,
  HeaderComment,
  CommentReplyContainer,
  InputStyled,
  ButtonSendContainer,
  CommentFormContainer,
  ButtonAction,
  CommentActive,
  ButtonMenu,
  BackgroundDefault,
}
