import { Box, List } from '@mui/material'
import { useTranslation } from 'next-i18next'
import KnowledgeIcon from 'public/assets/svgs/blog.svg'
import ConsultationIcon from 'public/assets/svgs/consulation.svg'
import HomeIcon from 'public/assets/svgs/home.svg'
import FavoriteIcon from 'public/assets/svgs/star.svg'
import { HEADER_HEIGHT } from '../Header'
import { ListItemButton } from './ItemSidebar'
// import FAQIcon from 'public/assets/svgs/faq.svg'
// import UseCase from 'public/assets/svgs/use_case.svg'

const SIDE_BAR_WIDTH = 250

export const menuHref = {
  home: '/',
  favorite: '/favorite',
  consultation: '/consultation',
  knowledge_blog: '/knowledge_blog',
}

const Sidebar = () => {
  const { t } = useTranslation()
  const menus = [
    { title: t('sidebar.home'), icon: HomeIcon, href: '/' },
    { title: t('sidebar.favorite'), icon: FavoriteIcon, href: '/favorite' },
    {
      title: t('sidebar.consultation'),
      icon: ConsultationIcon,
      href: '/consultation',
      disable: true,
    },
    { title: t('sidebar.knowledge_blog'), icon: KnowledgeIcon, href: '/knowledge', disable: true },
    // { title: t('sidebar.faq'), icon: FAQIcon, href: '/faq' },
    // { title: t('sidebar.use_case'), icon: UseCase, href: '/use_case' },
  ]

  return (
    <Box
      sx={{
        marginTop: `${HEADER_HEIGHT}px`,
        width: SIDE_BAR_WIDTH,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          width: SIDE_BAR_WIDTH,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.greyScale[300]}`,
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            px: 2,
            py: 3.25,
          }}
          component="nav"
        >
          {menus.map((menu) => (
            <ListItemButton key={menu.title} menu={menu} />
          ))}
        </List>
      </Box>
    </Box>
  )
}

export { Sidebar }
