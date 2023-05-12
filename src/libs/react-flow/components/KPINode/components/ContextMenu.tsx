import { PopoverPosition, PopoverReference } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Menu, MenuItem, MenuItemDelete, MenuItemPaste } from './styled'

type PropsType = {
  open: boolean
  onClose: () => void
  anchorReference: PopoverReference | undefined
  anchorPosition: PopoverPosition | undefined
}

const ContextMenu: React.FC<PropsType> = ({ open, onClose, anchorReference, anchorPosition }) => {
  const { t } = useTranslation(['file'])

  return (
    <Menu
      id="file-menu"
      open={open}
      onClose={onClose}
      anchorReference={anchorReference}
      anchorPosition={anchorPosition}
    >
      <MenuItem>{t('menu_context.edit')}</MenuItem>
      <MenuItem>{t('menu_context.copy')}</MenuItem>
      <MenuItemPaste>{t('menu_context.paste')}</MenuItemPaste>
      <MenuItemDelete>{t('menu_context.delete')}</MenuItemDelete>
    </Menu>
  )
}

export { ContextMenu }
