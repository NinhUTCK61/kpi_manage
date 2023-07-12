import { Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { StackContainer } from '../StackContainer'
import { Account } from './Account'
import { AppBar } from './AppBar'
import { Language } from './Language'
import { Search } from './Search'

const HEADER_HEIGHT = 60

const Header = () => {
  const router = useRouter()

  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={19.75} alignItems="center">
          <Image
            src={LogoHeader}
            alt="logo-header"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
            priority
          />
          <Search />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Language />
          <Account />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

export { HEADER_HEIGHT, Header }
