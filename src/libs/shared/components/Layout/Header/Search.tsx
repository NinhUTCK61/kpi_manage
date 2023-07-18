import { Button, Stack, styled } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SearchIcon from 'public/assets/svgs/icon_search.svg'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputSearch } from '../../Form/Input'

type SearchType = {
  search: string
}

const Search = () => {
  const { control } = useForm<SearchType>({
    defaultValues: {
      search: '',
    },
  })

  const router = useRouter()

  const searchParam = (router.query.search as string) || ''

  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSearchClick = () => {
    if (searchParam !== searchValue) {
      setSearchValue(searchValue.trim())

      router.push(
        {
          query: { search: searchValue.trim() },
        },
        undefined,
        { shallow: true },
      )
    }
  }

  const handleKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <SectionSearch alignItems="center" direction="row">
      <InputSearch
        name="search"
        control={control}
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
        onKeyUp={handleKeySubmit}
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
}))
