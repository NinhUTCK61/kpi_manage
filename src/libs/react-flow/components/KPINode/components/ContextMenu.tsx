import { MenuProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Menu, MenuItem } from './styled'

export enum CtxMenuType {
  Edit = 'edit',
  Copy = 'copy',
  Paste = 'paste',
  Delete = 'delete',
}

type ContextMenuItem = {
  title: string
  type: CtxMenuType
}

export type CtxMenuProps = MenuProps & {
  disabledMenu?: CtxMenuType[]
}

const ContextMenu: React.FC<CtxMenuProps> = ({
  open,
  onClose,
  anchorPosition,
  disabledMenu = [],
}) => {
  const { t } = useTranslation(['file'])

  const contextMenuItem: ContextMenuItem[] = [
    {
      title: t('menu_context.edit'),
      type: CtxMenuType.Edit,
    },
    {
      title: t('menu_context.copy'),
      type: CtxMenuType.Copy,
    },
    {
      title: t('menu_context.paste'),
      type: CtxMenuType.Paste,
    },
    {
      title: t('menu_context.delete'),
      type: CtxMenuType.Delete,
    },
  ]

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      {contextMenuItem.map((menu) => (
        <MenuItem
          key={menu.title}
          disabled={disabledMenu.includes(menu.type)}
          isDelete={menu.type === CtxMenuType.Delete}
        >
          {menu.title}
        </MenuItem>
      ))}
    </Menu>
  )
}

export { ContextMenu }