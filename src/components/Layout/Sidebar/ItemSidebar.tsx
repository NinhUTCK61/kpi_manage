import {
  ListItemButton as _ListItemButton,
  ListItemIcon as _ListItemIcon,
  ListItemText as _ListItemText,
} from '@mui/material'
import { styled } from '@mui/material/styles'

type ListItemButtonType = {
  active?: number
}

const ListItemButton = styled(_ListItemButton)<ListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
  borderRadius: '6px',
  padding: `8px 14px`,
}))

const ListItemIcon = styled(_ListItemIcon)({
  minWidth: 20,
  marginRight: '14px',
})

const ListItemText = styled(_ListItemText)({
  '.MuiListItemText-primary': {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
})

export { ListItemButton, ListItemIcon, ListItemText }
