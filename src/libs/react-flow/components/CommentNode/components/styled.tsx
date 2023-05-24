import { Box, Button, InputBase, Popover, Stack, styled } from '@mui/material'

const CommentFormContainer = styled(Popover)({
  '.MuiPopover-paper': {
    boxShadow: 'none',
    backgroundColor: 'inherit',
  },
  overflowY: 'scroll',
})

const CommentContainer = styled(Box)(({ theme }) => ({
  width: 400,
  background: theme.palette.trueGrey[50],
  position: 'relative',
}))

const HeaderComment = styled(Stack)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.greyScale[300]}`,
  padding: '0 16px',
  height: 56,
}))

const CommentReplyContainer = styled(Stack)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.greyScale[300]}`,
  padding: 16,
}))

const ButtonSend = styled(Button)({
  position: 'absolute',
  right: 16,
  bottom: 19,
  minWidth: 0,
  padding: 0,
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
  CommentContainer,
  HeaderComment,
  CommentReplyContainer,
  InputStyled,
  ButtonSend,
  CommentFormContainer,
  ButtonAction,
  CommentActive,
}
