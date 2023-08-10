import { useSearchStore } from '@/features/template/store'
import { Button, InputBase, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SearchIcon from 'public/assets/svgs/icon_search.svg'
import SearchIconBlack from 'public/assets/svgs/icon_search_black.svg'
import { KeyboardEvent, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const Search = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { setSearchTemplate, searchInput, setSearchInput } = useSearchStore(
    (state) => ({
      setSearchTemplate: state.setSearchTemplate,
      searchInput: state.searchInput,
      setSearchInput: state.setSearchInput,
    }),
    shallow,
  )

  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      if (url === '/' || url === '/en') {
        return
      }

      setSearchTemplate('')
      setSearchInput('')
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events, setSearchInput, setSearchTemplate])

  const handleSearchClick = () => {
    setSearchTemplate(searchInput)
    if (router.pathname === '/' || router.pathname === '/en') {
      return
    }
    router.push('/')
  }

  const handleKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <SectionSearch>
      <InputSearch
        name="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`${t('search_placeholder')}`}
        onKeyUp={handleKeySubmit}
        type="search"
      />

      <ButtonSearch variant="contained" onClick={handleSearchClick}>
        <Image src={SearchIcon} alt="search icon" width={16} height={16} />
      </ButtonSearch>

      <ButtonSearchMobile onClick={handleSearchClick}>
        <Image src={SearchIconBlack} alt="search icon mobile" width={20} height={20} />
      </ButtonSearchMobile>
    </SectionSearch>
  )
}

export { Search }

const ButtonSearch = styled(Button)(({ theme }) => ({
  background: theme.palette.customPrimary[600],
  height: 24,
  width: 32,
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const SectionSearch = styled(Stack)(({ theme }) => ({
  background: theme.palette.trueGrey[100],
  borderRadius: 8,
  padding: theme.spacing(0, 1.75),
  flexDirection: 'row',
  alignItems: 'center',
}))

const InputSearch = styled(InputBase)(({ theme }) => ({
  marginRight: theme.spacing(1.75),
  borderRadius: theme.spacing(1),
  color: theme.palette.common.black,
  gap: 8,
  backgroundColor: theme.palette.greyScale[100],
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.75, 1, 0),
  },
  height: 38,
  width: 465,
  '& .MuiInputAdornment-positionStart': {
    marginRight: 0,
  },
  fontSize: 15,
  [theme.breakpoints.down('lg')]: {
    width: 350,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 34,
  },
}))

const ButtonSearchMobile = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: 0,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))
