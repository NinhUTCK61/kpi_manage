import {
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material'

type ListItemButtonType = {
  active?: number
}

const ListItemButton = styled(MuiListItemButton)<ListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
  borderRadius: '6px',
  padding: `8px 14px`,
}))

const ListItemIcon = styled(MuiListItemIcon)({
  minWidth: 20,
  marginRight: '14px',
})

const ListItemText = styled(MuiListItemText)({
  '.MuiListItemText-primary': {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
})

export { ListItemButton, ListItemIcon, ListItemText }
