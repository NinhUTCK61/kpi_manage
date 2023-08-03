import { useSearchStore } from '@/features/template/store'
import { Button, InputBase, Stack, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SearchIcon from 'public/assets/svgs/icon_search.svg'
import { KeyboardEvent, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const Search = () => {
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
        placeholder="Search..."
        onKeyUp={handleKeySubmit}
        type="search"
      />

      <ButtonSearch variant="contained" onClick={handleSearchClick}>
        <Image src={SearchIcon} alt="" width={16} height={16} />
      </ButtonSearch>
    </SectionSearch>
  )
}

export { Search }

const ButtonSearch = styled(Button)(({ theme }) => ({
  background: theme.palette.customPrimary[600],
  height: 24,
  width: 32,
  minWidth: 0,
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
  },
}))
