import { Box, List } from '@mui/material'
import { HEIGHT_HEADER } from '../Header/Header'

import KnowledgeIcon from 'public/assets/imgs/blog.png'
import ConsultationIcon from 'public/assets/imgs/consulation.png'
import FAQIcon from 'public/assets/imgs/faq.png'
import HomeIcon from 'public/assets/imgs/home.png'
import FavoriteIcon from 'public/assets/imgs/likes.png'
import OrganizationIcon from 'public/assets/imgs/organization.png'
import ReportingIcon from 'public/assets/imgs/reporting.png'
import UseCase from 'public/assets/imgs/use_case.png'
import { useMemo } from 'react'
import { ListItemButton } from './ItemSidebar'

const SIDE_BAR_WIDTH = 250

const Sidebar = () => {
  const menus = useMemo(
    () => [
      { title: 'Home', icon: HomeIcon, href: '/' },
      { title: 'Favorite', icon: FavoriteIcon, href: '/favorite' },
      { title: 'Organization chart', icon: OrganizationIcon, href: '/organization' },
      { title: 'Reporting', icon: ReportingIcon, href: '/reporting' },
      { title: 'Consultation', icon: ConsultationIcon, href: '/consultation' },
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
