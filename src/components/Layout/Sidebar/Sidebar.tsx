import { Box, List } from '@mui/material'
import { HEIGHT_HEADER } from '../Header/Header'

import { useTranslation } from 'next-i18next'
import KnowledgeIcon from 'public/assets/svgs/blog.svg'
import ConsultationIcon from 'public/assets/svgs/consulation.svg'
import FAQIcon from 'public/assets/svgs/faq.svg'
import HomeIcon from 'public/assets/svgs/home.svg'
import FavoriteIcon from 'public/assets/svgs/likes.svg'
import UseCase from 'public/assets/svgs/use_case.svg'
import { useMemo } from 'react'
import { ListItemButton } from './ItemSidebar'

const SIDE_BAR_WIDTH = 250

const Sidebar = () => {
  const { t } = useTranslation()
  const menus = useMemo(
    () => [
      { title: t('sidebar.home'), icon: HomeIcon, href: '/' },
      { title: t('sidebar.favorite'), icon: FavoriteIcon, href: '/favorite' },
      { title: t('sidebar.consultation'), icon: ConsultationIcon, href: '/consultation' },
      { title: t('sidebar.knowledge_blog'), icon: KnowledgeIcon, href: '/knowledge' },
      { title: t('sidebar.faq'), icon: FAQIcon, href: '/faq' },
      { title: t('sidebar.use_case'), icon: UseCase, href: '/use_case' },
    ],
    [t],
  )

  return (
    <Box
      sx={{
        marginTop: `${HEIGHT_HEADER}px`,
        borderRight: (theme) => `1px solid ${theme.palette.greyScale[300]}`,
        width: SIDE_BAR_WIDTH,
      }}
    >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', px: 2, py: 3.25 }}
        component="nav"
      >
        {menus.map((menu) => (
          <ListItemButton key={menu.title} menu={menu} />
        ))}
      </List>
    </Box>
  )
}

export { Sidebar }
