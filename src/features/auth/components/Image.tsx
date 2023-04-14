import { styled } from '@mui/material'
import Image from 'next/image'

const CustomImage = styled(Image)({
  marginBottom: '12px',
  filter: 'drop-shadow(0px 2px 40px rgba(17, 17, 17, 0.08))',
})

export { CustomImage }
