import { Button, styled } from '@mui/material'

const ButtonAction = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

export { ButtonAction }
