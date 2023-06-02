import { isReactFlowKPISpeechBallon } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { MenuProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { shallow } from 'zustand/shallow'
import { Menu, MenuItem } from '../../KPINode/components/styled'
import { useSpeechBallonContext } from '../context'
import {
  useSpeechBallonCreateMutation,
  useSpeechBallonDeleteMutation,
  useUpdateSpeechBallonMutation,
} from '../hooks'

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

const ContextMenu: React.FC<CtxMenuProps> = ({ open, onClose, anchorPosition }) => {
  const { t } = useTranslation(['file'])

  const { setNodeFocused } = useRFStore(storeSelector, shallow)
  const { data, handleSetEditing } = useSpeechBallonContext()
  const { mutate: deleteSpeechBallon } = useSpeechBallonDeleteMutation()
  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const { mutate: update } = useUpdateSpeechBallonMutation()
  const { mutate: create } = useSpeechBallonCreateMutation()

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

  const handlePaste = () => {
    if (!nodeCopy) return

    if (!isReactFlowKPISpeechBallon(nodeCopy)) return

    const speechBallon = {
      id: data.id,
      text: nodeCopy.data.text,
      node_style: nodeCopy.data.node_style,
      shape: nodeCopy.data.shape,
      layout: nodeCopy.data.layout,
      node_id: data.node_id,
    }

    if (!data.is_saved)
      create({
        ...speechBallon,
        x: data.x,
        y: data.y,
        template_id: data.template_id,
      })
    else {
      update(speechBallon)
    }
  }

  const handleMenuSelect = (type: string) => {
    switch (type) {
      case CtxMenuType.Edit:
        handleEdit()
        break
      case CtxMenuType.Delete:
        if (data.is_saved) deleteSpeechBallon(data)
        break
      case CtxMenuType.Copy:
        setNodeCopy(data.id)
        break
      case CtxMenuType.Paste:
        handlePaste()
        break
      default:
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
          disabled={
            (menu.type === CtxMenuType.Delete && !data.is_saved) ||
            (menu.type === CtxMenuType.Paste && !nodeCopy)
          }
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
