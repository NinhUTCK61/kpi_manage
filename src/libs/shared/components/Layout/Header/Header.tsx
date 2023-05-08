import { InputAdornment, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import SearchIcon from 'public/assets/svgs/search.svg'
import { useForm } from 'react-hook-form'
import { InputSearch } from '../../Form/Input'
import { StackContainer } from '../StackContainer'
import { Account } from './Account'
import { AppBar } from './AppBar'
import { Language } from './Language'

const HEADER_HEIGHT = 60

type SearchType = {
  search: string
}

const Header = () => {
  const router = useRouter()

  const { control } = useForm<SearchType>({
    defaultValues: {
      search: '',
    },
  })

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

          <InputSearch
            name="search"
            control={control}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <Image src={SearchIcon} alt="search-icon" />
              </InputAdornment>
            }
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Language />
          <Account />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

export { Header, HEADER_HEIGHT }
