import { Avatar as MuiAvatar, Stack, styled } from '@mui/material'

const Avatar = styled(MuiAvatar)({
  width: 28,
  height: 28,
})

const StackName = styled(Stack)({
  alignItems: 'center',
  cursor: 'pointer',
})

export { Avatar, StackName }
