import { styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { StackContainer } from '../StackContainer'
import { AppBar } from './AppBar'
import { Language } from './Language'

const MuiImage = styled(Image)({
  cursor: 'pointer',
})

const HeaderUnAuth = () => {
  const router = useRouter()

  return (
    <AppBar elevation={0} position="relative">
      <StackContainer>
        <MuiImage
          src={LogoHeader}
          alt="logo-header"
          priority
          onClick={() => router.push('/sign-in')}
        />

        <Language />
      </StackContainer>
    </AppBar>
  )
}

export { HeaderUnAuth }
