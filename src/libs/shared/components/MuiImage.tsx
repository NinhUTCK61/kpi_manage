import { styled } from '@mui/material'
import Image from 'next/image'

export const MuiImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
  },
}))
