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
const HEADER_MOBILE_HEIGHT = 48

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

    if (displaySearchHref.includes(router.pathname)) {
      setOpenSearch(false)
    }
  }, [isLarge, router])

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
        <>
          {displaySearchHref.includes(router.pathname) && (
            <StackSearch>
              <ButtonCloseSearch onClick={handleCloseSearch}>
                <Image src={ArrowLeftIcon} width={20} height={20} alt="close search icon" />
              </ButtonCloseSearch>

              <SearchBar>
                <Search />
              </SearchBar>
            </StackSearch>
          )}
        </>
      ) : (
        <StackContainer>
          <Stack direction="row" spacing={18.75} alignItems="center">
            <MuiImage
              src={LogoHeader}
              alt="logo-header"
              onClick={() => router.push('/')}
              priority
            />

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {displaySearchHref.includes(router.pathname) && <Search />}
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            {displaySearchHref.includes(router.pathname) && (
              <SearchMobileButton handleOpenSearch={handleOpenSearch} />
            )}

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

export { HEADER_HEIGHT, HEADER_MOBILE_HEIGHT, Header }

const StackSearch = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const ButtonCloseSearch = styled(Button)({
  minWidth: 20,
  marginRight: 8,
  padding: 0,
})

const SearchBar = styled(Box)({
  width: 'calc(100% - 28px)', // 100% - widthButtonCloseSearch
})

const MuiImage = styled(Image)(({ theme }) => ({
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    width: 70,
    height: 24,
  },
}))
