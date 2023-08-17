import Image from 'next/image'
import SearchMobileIcon from 'public/assets/svgs/search_mobile.svg'
import React from 'react'
import { ButtonAction } from './styled'

type SearchMobileButtonType = {
  handleOpenSearch: () => void
}

const SearchMobileButton: React.FC<SearchMobileButtonType> = ({ handleOpenSearch }) => {
  return (
    <ButtonAction sx={{ mr: 2 }}>
      <Image
        src={SearchMobileIcon}
        alt="menu-header"
        onClick={handleOpenSearch}
        style={{ cursor: 'pointer' }}
        priority
      />
    </ButtonAction>
  )
}

export { SearchMobileButton }
