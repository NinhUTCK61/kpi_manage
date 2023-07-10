import { useRFStore } from '@/libs/react-flow/hooks'

import { useTranslation } from 'next-i18next'
import React from 'react'
import { useKPINodeContext } from '../context'
import { useNodeDeleteMutation, useNodeHandler } from '../hooks'
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

export type CtxMenuProps = {
  disabledMenu?: CtxMenuType[]
}

const contextMenuItem: ContextMenuItem[] = [
  {
    title: 'menu_context.copy',
    type: CtxMenuType.Copy,
  },
  {
    title: 'menu_context.paste',
    type: CtxMenuType.Paste,
  },
  {
    title: 'menu_context.delete',
    type: CtxMenuType.Delete,
  },
]

const ContextMenu: React.FC<CtxMenuProps> = ({ disabledMenu = [] }) => {
  const { t } = useTranslation(['file'])
  const { data, contextMenu, setContextMenu } = useKPINodeContext()
  const { handleDelete: deleteMutate } = useNodeDeleteMutation()
  const { handlePaste } = useNodeHandler()
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)

  const handleClose = () => {
    setContextMenu(null)
  }

  const handleAction = (key: CtxMenuType) => {
    switch (key) {
      case CtxMenuType.Copy:
        setNodeCopy(data.id)
        break
      case CtxMenuType.Paste:
        handlePaste()
        break
      case CtxMenuType.Delete:
        deleteMutate(data.id)
        break
      default:
        break
    }
    handleClose()
  }

  return (
    <Menu
      open={!!contextMenu}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        !!contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
      }
    >
      {contextMenuItem.map((menu) => (
        <MenuItem
          key={menu.title}
          disabled={disabledMenu.includes(menu.type)}
          isDelete={menu.type === CtxMenuType.Delete}
          onClick={() => handleAction(menu.type)}
        >
          {t(menu.title)}
        </MenuItem>
      ))}
    </Menu>
  )
}

export { ContextMenu }
