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
  width: 320,
  background: trueGrey[50],
  position: 'relative',
  margin: 8,
  marginTop: 80,
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
    '&::-webkit-scrollbar': {
      width: 6,
    },
    '&::-webkit-scrollbar-track': {
      background: greyScale[300],
    },
    '&::-webkit-scrollbar-thumb': {
      background: greyScale[700],
    },
  },
  padding: 0,
}))

const ButtonAction = styled(Button)({
  minWidth: 0,
  padding: 0,
})

const ButtonSendContainer = styled(Stack)({
  height: 48,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: 16,
  bottom: 0,
})

const ButtonMenu = styled(ButtonBase)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.base.white,
  background: theme.palette.base.black,
  padding: '12px 16px',
  '&::hover': {
    background: theme.palette.base.black,
  },
  '&.MuiButtonBase-root': {
    justifyContent: 'flex-start',
  },
}))

const BackgroundDefault = styled(Stack)({
  backgroundColor: greyScale[200],
  borderRadius: '100%',
})

const ListCommentContainer = styled(Box)({
  maxHeight: 300,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: greyScale[300],
  },
  '&::-webkit-scrollbar-thumb': {
    background: greyScale[700],
  },
})

export {
  BackgroundDefault,
  ButtonAction,
  ButtonMenu,
  ButtonSendContainer,
  CommentContainer,
  CommentFormContainer,
  CommentReplyContainer,
  HeaderComment,
  InputStyled,
  ListCommentContainer,
}
