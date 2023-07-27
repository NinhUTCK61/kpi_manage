import { CustomImage } from '@/features/auth/components'
import { Button, Drawer, ListItemIcon, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import KnowledgeIcon from 'public/assets/svgs/blog.svg'
import ConsultationIcon from 'public/assets/svgs/consulation.svg'
import HomeIcon from 'public/assets/svgs/home.svg'
import FavoriteIcon from 'public/assets/svgs/unlike_star.svg'
import { Account } from './Account'
import CloseIcon from '/public/assets/svgs/close.svg'

type MenuProps = {
  handleCloseMenu: () => void
  open: boolean
}

const Menu: React.FC<MenuProps> = ({ open, handleCloseMenu }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const menus = [
    { title: t('sidebar.home'), icon: HomeIcon, handle: () => router.push('/') },
    { title: t('sidebar.favorite'), icon: FavoriteIcon, handle: () => router.push('/favorite') },
    {
      title: t('sidebar.consultation'),
      icon: ConsultationIcon,
      handle: () => router.push('/'),
    },
    {
      title: t('sidebar.knowledge_blog'),
      icon: KnowledgeIcon,
      handle: () => router.push('/'),
    },
    // { title: t('sidebar.faq'), icon: FAQIcon, href: '/faq' },
    // { title: t('sidebar.use_case'), icon: UseCase, href: '/use_case' },
  ]

  return (
    <MenuMobile anchor="left" open={open}>
      <ButtonClose onClick={handleCloseMenu}>
        <CustomImage alt="icon" src={CloseIcon} sx={{ mb: 0 }} />
      </ButtonClose>

      <Stack direction="column" spacing={1}>
        {menus.map((menu) => (
          <Stack
            key={menu.title}
            direction="row"
            alignItems="center"
            padding="8px 16px"
            onClick={menu.handle}
          >
            <ListItemIcon sx={{ minWidth: 20, mr: 0.5 }}>
              <Image src={menu.icon} alt="icon" width={20} height={20} />
            </ListItemIcon>

            <Typography color="base.black" variant="body2">
              {menu.title}
            </Typography>
          </Stack>
        ))}

        <Account />
      </Stack>
    </MenuMobile>
  )
}

export { Menu }

const MenuMobile = styled(Drawer)(({ theme }) => ({
  position: 'relative',
  display: 'none',
  '&.MuiDrawer-root': {
    '&& .MuiPaper-root': {
      width: '100%',
      padding: '16px 8px',
      borderRight: 'none',
    },
  },
  [theme.breakpoints.down('lg')]: {
    display: 'block',
  },
}))

const ButtonClose = styled(Button)({
  position: 'absolute',
  right: 16,
  top: 16,
  padding: 0,
  minWidth: 0,
  zIndex: 1000,
})
