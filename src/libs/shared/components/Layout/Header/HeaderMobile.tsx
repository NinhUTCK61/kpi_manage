import { Box, Drawer, Stack, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import MenuMobileIcon from 'public/assets/svgs/menu_mobile.svg'
import { useState } from 'react'
import { StackContainer } from '../StackContainer'
import { AppBar } from './AppBar'
import { Language } from './Language'

const HeaderMobile = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

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
        </Stack>

        <Stack direction="row" alignItems="center">
          <Language />

          <Image
            src={MenuMobileIcon}
            alt="menu-header"
            onClick={handleDrawerOpen}
            style={{ cursor: 'pointer', marginLeft: '8px' }}
            priority
          />
        </Stack>
      </StackContainer>

      <MenuMobile variant="persistent" anchor="left" open={open}>
        <Box onClick={handleDrawerClose}>HHEHEHE</Box>
      </MenuMobile>
    </AppBar>
  )
}

export { HeaderMobile }

const MenuMobile = styled(Drawer)({
  width: '100%',
  '&.MuiDrawer-root': {
    '&.MuiPaper-root': {
      right: 0,
    },
  },
})
