import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
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
  data?: SpeechBallonNodeType
  parentType?: string
}

const storeSelector = (state: RFStore) => ({
  setNodeFocused: state.setNodeFocused,
  nodeFocused: state.nodeFocused,
  setContextMenu: state.setContainer,
  nodes: state.nodes,
})

const ContextMenu: React.FC<CtxMenuProps> = ({
  open,
  onClose,
  anchorPosition,
  disabledMenu = [],
}) => {
  const { t } = useTranslation(['file'])

  const { setNodeFocused, nodes } = useRFStore(storeSelector, shallow)
  const { data, setTypeContext } = useSpeechBallonContext()

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
    const node = nodes.find((node) => node.id == data?.id && node.type === 'speech_ballon') || null
    setNodeFocused(node)
    setTypeContext(CtxMenuType.Edit)
  }

  const handleMenuSelect = (type: string) => {
    switch (type) {
      case CtxMenuType.Edit:
        handleEdit()
        break
    }
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
