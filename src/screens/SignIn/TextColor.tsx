import { Typography, styled } from '@mui/material'

const TextColor = styled(Typography)(({ theme }) => ({
  color: theme.palette.customPrimary[500],
  fontWeight: 600,
  cursor: 'pointer',
}))

export { TextColor }
