import Image from 'next/image'
import MenuMobileIcon from 'public/assets/svgs/menu_mobile.svg'
import React from 'react'
import { ButtonAction } from './styled'

type MenuMobileButtonType = {
  handleOpenMenu: () => void
}

const MenuMobileButton: React.FC<MenuMobileButtonType> = ({ handleOpenMenu }) => {
  return (
    <ButtonAction>
      <Image
        src={MenuMobileIcon}
        alt="menu-header"
        onClick={handleOpenMenu}
        style={{ cursor: 'pointer', marginLeft: '8px' }}
        priority
      />
    </ButtonAction>
  )
}

export { MenuMobileButton }
