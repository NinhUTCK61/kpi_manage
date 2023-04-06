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
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from './ItemSidebar'

const Sidebar = () => {
  const router = useRouter()
  const menu = useMemo(
    () => [
      { title: 'Home', icon: HomeIcon, href: '/', active: false },
      { title: 'Favorite', icon: FavoriteIcon, href: '/favorite', active: false },
      { title: 'Organization chart', icon: OrganizationIcon, href: '/organization', active: false },
      { title: 'Reporting', icon: ReportingIcon, href: '/reporting', active: false },
      { title: 'consultation', icon: ConsultationIcon, href: '/consultation', active: false },
      { title: 'Knowledge Blog', icon: KnowledgeIcon, href: '/knowledge', active: false },
      { title: 'FAQ', icon: FAQIcon, href: '/faq', active: false },
      { title: 'Use case', icon: UseCase, href: '/use_case', active: false },
    ],
    [],
  )

  const checkHref = (href: string) => {
    if (router.pathname.split('/')[1] === href.split('/')[1]) {
      return 1
    }
    return 0
  }

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
        {menu.map((e) => (
          <ListItemButton key={e.title} active={checkHref(e.href)}>
            <ListItemIcon>
              <Image src={e.icon} alt={e.title} />
            </ListItemIcon>
            <ListItemText primary={e.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export { Sidebar }
