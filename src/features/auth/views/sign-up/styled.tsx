import { Typography, styled } from '@mui/material'

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  marginBottom: 4,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 8,
    fontSize: 19,
    lineHeight: '26px',
    fontWeight: 700,
  },
}))

const ChildTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.greyScale[600],
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
    lineHeight: '22px',
  },
}))

export { ChildTitle, Title }
