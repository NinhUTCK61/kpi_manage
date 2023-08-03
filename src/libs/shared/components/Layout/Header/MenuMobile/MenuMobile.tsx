import { CustomImage } from '@/features/auth/components'
import { Button, Drawer, List, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import KnowledgeIcon from 'public/assets/svgs/blog.svg'
import ConsultationIcon from 'public/assets/svgs/consulation.svg'
import HomeIcon from 'public/assets/svgs/home.svg'
import FavoriteIcon from 'public/assets/svgs/unlike_star.svg'
import { AccountMobile } from './AccountMobile'
import { ItemMenuMobile } from './ItemMenuMobile'
import CloseIcon from '/public/assets/svgs/close.svg'

type MenuProps = {
  handleCloseMenu: () => void
  openMenu: boolean
}

const MenuMobile: React.FC<MenuProps> = ({ openMenu, handleCloseMenu }) => {
  const { t } = useTranslation('common')

  const menus = [
    {
      title: t('sidebar.home'),
      icon: HomeIcon,
      href: '/',
    },
    {
      title: t('sidebar.favorite'),
      icon: FavoriteIcon,
      href: '/favorite',
    },
    {
      title: t('sidebar.consultation'),
      icon: ConsultationIcon,
      href: '/consultation',
      disable: true,
    },
    {
      title: t('sidebar.knowledge_blog'),
      icon: KnowledgeIcon,
      href: '/knowledge-blog',
      disable: true,
    },
    // { title: t('sidebar.faq'), icon: FAQIcon, href: '/faq' },
    // { title: t('sidebar.use_case'), icon: UseCase, href: '/use_case' },
  ]

  return (
    <MenuMobileContainer anchor="right" open={openMenu}>
      <List component="div" disablePadding>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" justifyContent="flex-end">
            <ButtonCloseMenu onClick={handleCloseMenu}>
              <CustomImage alt="icon" src={CloseIcon} sx={{ mb: 0 }} />
            </ButtonCloseMenu>
          </Stack>

          {menus.map((menu) => (
            <ItemMenuMobile key={menu.title} menu={menu} handleCloseMenu={handleCloseMenu} />
          ))}

          <AccountMobile handleCloseMenu={handleCloseMenu} />
        </Stack>
      </List>
    </MenuMobileContainer>
  )
}

export { MenuMobile }

const MenuMobileContainer = styled(Drawer)(({ theme }) => ({
  '&.MuiDrawer-root': {
    '&& .MuiPaper-root': {
      width: '100%',
      padding: theme.spacing(2),
      borderRight: 'none',
    },
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    '&.MuiDrawer-root': {
      '&& .MuiPaper-root': {
        padding: theme.spacing(3, 4),
      },
    },
  },
}))

const ButtonCloseMenu = styled(Button)({
  padding: 0,
  minWidth: 0,
  zIndex: 1000,
})
