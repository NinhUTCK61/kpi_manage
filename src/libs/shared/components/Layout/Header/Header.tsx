import { useMatchesSize } from '@/libs/hooks'
import { Box, Button, Stack, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_search.svg'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { useEffect, useState } from 'react'
import { menuHref } from '../Sidebar'
import { StackContainer } from '../StackContainer'
import { Account } from './Account'
import { AppBar } from './AppBar'
import { Language } from './Language'
import { MenuMobile } from './MenuMobile'
import { MenuMobileButton } from './MenuMobile/MenuMobileIcon'
import { SearchMobileButton } from './MenuMobile/SearchMobileButton'
import { Search } from './Search'

const HEADER_HEIGHT = 60

const displaySearchHref = [menuHref.home, menuHref.favorite]

const Header = () => {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const { isLarge } = useMatchesSize()

  useEffect(() => {
    if (isLarge) {
      setOpenMenu(false)
      setOpenSearch(false)
    }
  }, [isLarge])

  const handleOpenMenu = () => {
    setOpenMenu(true)
  }

  const handleCloseMenu = () => {
    setOpenMenu(false)
  }

  const handleOpenSearch = () => {
    setOpenSearch(true)
  }

  const handleCloseSearch = () => {
    setOpenSearch(false)
  }

  return (
    <AppBar elevation={0}>
      {openSearch ? (
        <StackSearch>
          <ButtonCloseSearch onClick={handleCloseSearch}>
            <Image src={ArrowLeftIcon} width={20} height={20} alt="close search icon" />
          </ButtonCloseSearch>

          <Box width="100%">{displaySearchHref.includes(router.pathname) && <Search />}</Box>
        </StackSearch>
      ) : (
        <StackContainer>
          <Stack direction="row" spacing={18.75} alignItems="center">
            <Image
              src={LogoHeader}
              alt="logo-header"
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
              priority
            />

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {displaySearchHref.includes(router.pathname) && <Search />}
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <SearchMobileButton handleOpenSearch={handleOpenSearch} />

            <Language />

            <Account />

            <MenuMobileButton handleOpenMenu={handleOpenMenu} />
          </Stack>
        </StackContainer>
      )}

      <MenuMobile openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
    </AppBar>
  )
}

export { HEADER_HEIGHT, Header }

const StackSearch = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const ButtonCloseSearch = styled(Button)({
  minWidth: 0,
  marginRight: 8,
  padding: 0,
})
