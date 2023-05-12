import { PopoverPosition, PopoverReference } from '@mui/material'
import React from 'react'
import { Menu, MenuItem, MenuItemDelete, MenuItemPaste } from './styled'

type PropsType = {
  open: boolean
  onClose: () => void
  anchorReference: PopoverReference | undefined
  anchorPosition: PopoverPosition | undefined
}

const ContextMenu: React.FC<PropsType> = ({ open, onClose, anchorReference, anchorPosition }) => {
  return (
    <Menu
      id="file-menu"
      open={open}
      onClose={onClose}
      anchorReference={anchorReference}
      anchorPosition={anchorPosition}
    >
      <MenuItem>Edit node / Speech balloon</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItemPaste>Paste</MenuItemPaste>
      <MenuItemDelete>Delete</MenuItemDelete>
    </Menu>
  )
}

export { ContextMenu }
