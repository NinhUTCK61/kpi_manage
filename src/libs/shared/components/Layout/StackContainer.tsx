import { Stack, styled } from '@mui/material'

const StackContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 5),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}))

export { StackContainer }
