import { PopoverPosition, PopoverReference } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Menu, MenuItem } from './styled'

type PropsType = {
  open: boolean
  onClose: () => void
  anchorReference: PopoverReference | undefined
  anchorPosition: PopoverPosition | undefined
}

const ContextMenu: React.FC<PropsType> = ({ open, onClose, anchorReference, anchorPosition }) => {
  const { t } = useTranslation(['file'])
  const contextMenuItem = [
    {
      title: t('menu_context.edit'),
    },
    {
      title: t('menu_context.copy'),
    },
    {
      title: t('menu_context.paste'),
      disable: true,
    },
    {
      title: t('menu_context.delete'),
      color: 'red',
    },
  ]

  return (
    <Menu
      id="file-menu"
      open={open}
      onClose={onClose}
      anchorReference={anchorReference}
      anchorPosition={anchorPosition}
    >
      {contextMenuItem.map((menu) => (
        <MenuItem key={menu.title} disabled={menu.disable}>
          {menu.title}
        </MenuItem>
      ))}
    </Menu>
  )
}

export { ContextMenu }
