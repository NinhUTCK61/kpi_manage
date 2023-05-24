import { useRFStore } from '@/libs/react-flow/hooks'
import { MenuProps } from '@mui/material'
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
  handle?: () => void
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
  const { data } = useKPINodeContext()
  const { mutate: deleteMutate } = useNodeDeleteMutation()
  const { handlePaste } = useNodeHandler()
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const nodeCopy = useRFStore((state) => state.nodeCopy)

  const contextMenuItem: ContextMenuItem[] = [
    {
      title: t('menu_context.copy'),
      type: CtxMenuType.Copy,
      handle: () => setNodeCopy(data.id),
    },
    {
      title: t('menu_context.paste'),
      type: CtxMenuType.Paste,
      handle: () => handlePaste(data),
    },
    {
      title: t('menu_context.delete'),
      type: CtxMenuType.Delete,
      handle: () => deleteMutate({ id: data.id }),
    },
  ]

  const handleAction = (handle?: () => void) => {
    handle?.()
    onClose?.({}, 'backdropClick')
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
          disabled={
            disabledMenu.includes(menu.type) || (menu.type === CtxMenuType.Paste && !nodeCopy)
          }
          isDelete={menu.type === CtxMenuType.Delete}
          onClick={() => handleAction(menu.handle)}
        >
          {menu.title}
        </MenuItem>
      ))}
    </Menu>
  )
}

export { ContextMenu }
