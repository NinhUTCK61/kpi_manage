import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import MenuMobileIcon from 'public/assets/svgs/menu_mobile.svg'
import { useState } from 'react'
import { menuHref } from '../Sidebar'
import { StackContainer } from '../StackContainer'
import { Account } from './Account'
import { AppBar } from './AppBar'
import { Language } from './Language'
import { MenuMobile } from './MenuMobile'
import { Search } from './Search'

const HEADER_HEIGHT = 60

const displaySearchHref = [menuHref.home, menuHref.favorite]

const Header = () => {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)

  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  const handleOpenMenu = () => {
    setOpenMenu(true)
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
          {displaySearchHref.includes(router.pathname) && <Search />}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Language />

          <Account />

          <Box display={{ xs: 'block', lg: 'none' }} height={24}>
            <Image
              src={MenuMobileIcon}
              alt="menu-header"
              onClick={handleOpenMenu}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              priority
            />
          </Box>
        </Stack>
      </StackContainer>

      <MenuMobile openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
    </AppBar>
  )
}

export { HEADER_HEIGHT, Header }
