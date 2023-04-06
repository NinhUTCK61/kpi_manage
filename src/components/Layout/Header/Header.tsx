import English from '@/assets/imgs/english.png'
import LogoHeader from '@/assets/imgs/logo_header.png'
import SearchIcon from '@/assets/imgs/search.png'
import { InputAdornment, AppBar as MuiAppBar, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { InputSearch } from '../../Form/Input'
import { Account } from '../Account'

const HEIGHT_HEADER = 61

const Header = () => {
  const { control } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  })

  const router = useRouter()

  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={20} alignItems="center">
          <Image src={LogoHeader} alt="logo-header" onClick={() => router.push('/')} />

          <InputSearch
            name="search"
            control={control}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <>
                  <Image src={SearchIcon} alt="search-icon" />
                </>
              </InputAdornment>
            }
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={English} alt="english" height={20} width={20} />
          <Typography variant="body2" mr={3}>
            English
          </Typography>
          <Account />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: HEIGHT_HEADER,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
}))

const StackContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 5),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
}))

export { Header, HEIGHT_HEADER }
