import { Stack, styled } from '@mui/material'

const StackEditor = styled(Stack)<{ disabled?: boolean }>(({ disabled }) => ({
  ...(disabled && {
    cursor: 'not-allowed',
    opacity: 0.3,
    pointerEvents: 'none',
  }),
}))

export { StackEditor }
