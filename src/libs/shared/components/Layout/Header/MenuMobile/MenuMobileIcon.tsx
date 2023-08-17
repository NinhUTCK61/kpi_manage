import Image from 'next/image'
import MenuMobileIcon from 'public/assets/svgs/menu_mobile.svg'
import React from 'react'
import { ButtonAction } from './styled'

type MenuMobileButtonType = {
  handleOpenMenu: () => void
}

const MenuMobileButton: React.FC<MenuMobileButtonType> = ({ handleOpenMenu }) => {
  return (
    <ButtonAction sx={{ ml: 2 }}>
      <Image
        src={MenuMobileIcon}
        alt="menu-header"
        onClick={handleOpenMenu}
        style={{ cursor: 'pointer' }}
        priority
      />
    </ButtonAction>
  )
}

export { MenuMobileButton }
