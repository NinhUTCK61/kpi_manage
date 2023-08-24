import {
  ListItemIcon,
  ListItemText,
  ListItemButton as MuiListItemButton,
  Typography,
  styled,
} from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

type StyleListItemButtonType = {
  active?: boolean
}

type ListItemButtonType = {
  menu: {
    title: string
    icon: StaticImageData
    href: string
    disable?: boolean
  }
  handleCloseMenu: () => void
}
const ItemMenuMobile: React.FC<ListItemButtonType> = ({ menu, handleCloseMenu }) => {
  const router = useRouter()

  const checkHref = (href: string) => {
    return router.asPath === href
  }

  const handleDirection = () => {
    router.push(menu.href)
    handleCloseMenu()
  }

  return (
    <StyleListItemButton
      onClick={handleDirection}
      active={checkHref(menu.href)}
      disabled={menu.disable}
    >
      <ListItemIcon sx={{ minWidth: 20, mr: 0.5 }}>
        <Image src={menu.icon} alt="icon" width={20} height={20} />
      </ListItemIcon>

      <ListItemText>
        <Typography color="base.black" variant="body2">
          {menu.title}
        </Typography>
      </ListItemText>
    </StyleListItemButton>
  )
}

export { ItemMenuMobile }

export const StyleListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleListItemButtonType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
}))
