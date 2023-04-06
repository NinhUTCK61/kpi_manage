import {
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  styled,
} from '@mui/material'
import Image, { type StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

type StyleListItemButtonType = {
  active?: number
}

type ListItemButtonType = {
  menu: {
    title: string
    icon: StaticImageData
    href: string
  }
}

const ListItemButton: React.FC<ListItemButtonType> = ({ menu }) => {
  const router = useRouter()

  const checkHref = (href: string) => {
    return router.asPath === href ? 1 : 0
  }

  return (
    <StyleListItemButton active={checkHref(menu.href)}>
      <ListItemIcon>
        <Image src={menu.icon} alt={menu.title} />
      </ListItemIcon>
      <ListItemText primary={menu.title} />
    </StyleListItemButton>
  )
}

const StyleListItemButton = styled(MuiListItemButton)<StyleListItemButtonType>(
  ({ theme, active }) => ({
    backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
    borderRadius: '6px',
    padding: `8px 12px`,
  }),
)

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
  margin: 0,
})

export { ListItemButton, ListItemIcon, ListItemText }
