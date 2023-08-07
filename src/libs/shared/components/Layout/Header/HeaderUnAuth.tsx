import { styled } from '@mui/material'
import Image from 'next/image'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { CustomLink } from '../../CustomLink'
import { StackContainer } from '../StackContainer'
import { AppBar } from './AppBar'
import { Language } from './Language'

const MuiImage = styled(Image)({
  cursor: 'pointer',
})

const HeaderUnAuth = () => {
  return (
    <AppBar elevation={0} position="relative">
      <StackContainer>
        <CustomLink href={'/sign-in'}>
          <MuiImage src={LogoHeader} alt="logo-header" priority />
        </CustomLink>

        <Language />
      </StackContainer>
    </AppBar>
  )
}

export { HeaderUnAuth }
