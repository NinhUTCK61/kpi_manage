import English from '@/assets/imgs/english.png'
import LogoHeader from '@/assets/imgs/logo_header.png'
import { AppBar as _Appbar, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
const HEIGHT_HEADER = 61

const Header = () => {
  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Image src={LogoHeader} alt="logo-header" />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={English} alt="english" height={20} width={20} />
          <Typography variant="body2">English</Typography>
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

const AppBar = styled(_Appbar)(({ theme }) => ({
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
