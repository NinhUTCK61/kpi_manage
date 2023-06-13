import { isReactFlowKPISpeechBallon } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore } from '@/libs/react-flow/types'
import { MenuProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { shallow } from 'zustand/shallow'
import { Menu, MenuItem } from '../../KPINode/components/styled'
import { useSpeechBallonActionContext, useSpeechBallonContext } from '../context'
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
  Resize = 'resize',
}

type ContextMenuItem = {
  title: string
  type: CtxMenuType
}

export type CtxMenuProps = MenuProps & {
  onClose: () => void
}

const storeSelector = (state: RFStore) => ({
  setNodeFocused: state.setNodeFocused,
})

const ContextMenu: React.FC<CtxMenuProps> = ({ open, onClose, anchorPosition }) => {
  const { t } = useTranslation(['file'])

  const { setNodeFocused } = useRFStore(storeSelector, shallow)
  const { data } = useSpeechBallonContext()
  const { isResizeEnabled } = useSpeechBallonActionContext()
  const { handleSetEditing, handleResize } = useSpeechBallonActionContext()
  const { mutate: deleteSpeechBallon } = useSpeechBallonDeleteMutation()
  const { mutate: update } = useUpdateSpeechBallonMutation()
  const { mutate: create } = useSpeechBallonCreateMutation()

  const setNodeCopy = useRFStore((state) => state.setNodeCopy)
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)

  const contextMenuItem: ContextMenuItem[] = [
    {
      title: t('menu_context.edit_speechBallon'),
      type: CtxMenuType.Edit,
    },
    {
      title: isResizeEnabled ? t('menu_context.cancel_resize') : t('menu_context.resize'),
      type: CtxMenuType.Resize,
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

  const handleDelete = () => {
    if (data.is_saved) {
      deleteSpeechBallon(data)
    } else {
      removeSpeechBallon(data.id)
    }
  }

  const handleMenuSelect = (type: string) => {
    switch (type) {
      case CtxMenuType.Edit:
        handleEdit()
        break
      case CtxMenuType.Delete:
        handleDelete()
        break
      case CtxMenuType.Copy:
        setNodeCopy(data.id)
        break
      case CtxMenuType.Paste:
        handlePaste()
        break
      case CtxMenuType.Resize:
        handleResize(!isResizeEnabled)
        break
      default:
        break
    }

    onClose()
  }

  const getDisabled = (menuType: CtxMenuType) => {
    const isPasteDisabled = menuType === CtxMenuType.Paste && !nodeCopy

    return isPasteDisabled
  }

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      id="menu-speech-ballon"
    >
      {contextMenuItem.map((menu) => (
        <MenuItem
          key={menu.title}
          disabled={getDisabled(menu.type)}
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
