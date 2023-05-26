import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { MenuProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { shallow } from 'zustand/shallow'
import { Menu, MenuItem } from '../../KPINode/components/styled'
import { useSpeechBallonContext } from '../context'

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
  onClose: () => void
}

const storeSelector = (state: RFStore) => ({
  setNodeFocused: state.setNodeFocused,
})

const ContextMenu: React.FC<CtxMenuProps> = ({
  open,
  onClose,
  anchorPosition,
  disabledMenu = [],
}) => {
  const { t } = useTranslation(['file'])

  const { setNodeFocused } = useRFStore(storeSelector, shallow)
  const { data, handleSetEditing } = useSpeechBallonContext()

  const contextMenuItem: ContextMenuItem[] = [
    {
      title: t('menu_context.edit_speechBallon'),
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

  const handleEdit = () => {
    setNodeFocused(data.id)
    handleSetEditing(true)
  }

  const handleMenuSelect = (type: string) => {
    switch (type) {
      case CtxMenuType.Edit:
        handleEdit()
        break
    }

    onClose()
  }

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
          onClick={() => handleMenuSelect(menu.type)}
        >
          {menu.title}
        </MenuItem>
      ))}
    </Menu>
  )
}

export { ContextMenu }
