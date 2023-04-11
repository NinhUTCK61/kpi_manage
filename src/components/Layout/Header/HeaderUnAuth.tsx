import { Stack, styled } from '@mui/material'
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
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={19.75} alignItems="center">
          <MuiImage src={LogoHeader} alt="logo-header" onClick={() => router.push('/')} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Language />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

export { HeaderUnAuth }
