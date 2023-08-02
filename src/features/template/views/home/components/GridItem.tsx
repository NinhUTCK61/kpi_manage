import { Grid, styled } from '@mui/material'

const GridItem = styled(Grid)(({ theme }) => ({
  width: '20% !important',
  [theme.breakpoints.down('xl')]: {
    width: '25% !important',
  },
  [theme.breakpoints.down('lg')]: {
    width: '33.33% !important',
  },
  [theme.breakpoints.down('md')]: {
    width: '50% !important',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
  },
}))

export { GridItem }
