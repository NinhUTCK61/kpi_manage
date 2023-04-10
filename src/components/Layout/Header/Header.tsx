import LogoHeader from '@/assets/imgs/logo_header.png'
import SearchIcon from '@/assets/imgs/search.png'
import { InputAdornment, Stack, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { InputSearch } from '../../Form/Input'
import { StackContainer } from '../StackContainer'
import { Account } from './Account'
import { AppBar } from './AppBar'
import { Language } from './Language'

const HEIGHT_HEADER = 60

const MuiImage = styled(Image)({
  cursor: 'pointer',
})

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
          <MuiImage src={LogoHeader} alt="logo-header" onClick={() => router.push('/')} />

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

export { Header, HEIGHT_HEADER }
