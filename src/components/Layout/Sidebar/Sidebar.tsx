import { Box, List } from '@mui/material'
import { HEIGHT_HEADER } from '../Header/Header'

import KnowledgeIcon from '@/assets/imgs/blog.png'
import ConsultationIcon from '@/assets/imgs/consulation.png'
import FAQIcon from '@/assets/imgs/faq.png'
import HomeIcon from '@/assets/imgs/home.png'
import FavoriteIcon from '@/assets/imgs/likes.png'
import OrganizationIcon from '@/assets/imgs/organization.png'
import ReportingIcon from '@/assets/imgs/reporting.png'
import UseCase from '@/assets/imgs/use_case.png'
import { useMemo } from 'react'
import { ListItemButton } from './ItemSidebar'

const Sidebar = () => {
  const menus = useMemo(
    () => [
      { title: 'Home', icon: HomeIcon, href: '/' },
      { title: 'Favorite', icon: FavoriteIcon, href: '/favorite' },
      { title: 'Organization chart', icon: OrganizationIcon, href: '/organization' },
      { title: 'Reporting', icon: ReportingIcon, href: '/reporting' },
      { title: 'consultation', icon: ConsultationIcon, href: '/consultation' },
      { title: 'Knowledge Blog', icon: KnowledgeIcon, href: '/knowledge' },
      { title: 'FAQ', icon: FAQIcon, href: '/faq' },
      { title: 'Use case', icon: UseCase, href: '/use_case' },
    ],
    [],
  )

  return (
    <Box
      sx={{
        marginTop: `${HEIGHT_HEADER}px`,
        borderRight: (theme) => `1px solid ${theme.palette.greyScale[300]}`,
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
