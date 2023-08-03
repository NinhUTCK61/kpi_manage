import { getImageUrl } from '@/libs/utils/misc'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowDownIcon from 'public/assets/svgs/arrow_down_select.svg'
import ArrowUpIcon from 'public/assets/svgs/arrow_up_select.svg'
import AvatarDefault from 'public/assets/svgs/avatar_default.svg'
import TermsOfUseIcon from 'public/assets/svgs/blog.svg'
import ChangeIcon from 'public/assets/svgs/change_pass.svg'
import LogOutIcon from 'public/assets/svgs/log_out.svg'
import PrivacyIcon from 'public/assets/svgs/privacy.svg'
import ProfileIcon from 'public/assets/svgs/profile.svg'
import { useState } from 'react'
import { ItemMenuMobile, StyleListItemButton } from './ItemMenuMobile'

type AccountMobileType = {
  handleCloseMenu: () => void
}

const AccountMobile: React.FC<AccountMobileType> = ({ handleCloseMenu }) => {
  const { data: sessionData } = useSession()
  const { t } = useTranslation()
  const router = useRouter()

  const menus = [
    {
      title: t('menu.edit'),
      icon: ProfileIcon,
      href: '/profile',
    },
    {
      title: t('menu.change_password'),
      icon: ChangeIcon,
      href: '/change-password',
    },
    {
      title: t('menu.privacy_policy'),
      icon: PrivacyIcon,
      href: '/privacy-policy',
      disable: true,
    },
    {
      title: t('menu.terms_of_use'),
      icon: TermsOfUseIcon,
      href: '/terms-of-use',
      disable: true,
    },
  ]

  const [openAccount, setOpenAccount] = useState(false)

  const handleClick = () => {
    setOpenAccount(!openAccount)
  }

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/' + router.locale + '/sign-in',
    })

    handleCloseMenu()
  }

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: 0, mr: 0.5 }}>
          <Image
            src={sessionData?.user.image ? getImageUrl(sessionData?.user.image) : AvatarDefault}
            width={20}
            height={20}
            alt="avatar"
            style={{ borderRadius: '100%', marginRight: '4px' }}
          />
        </ListItemIcon>

        <ListItemText>
          <Typography variant="body2" color="base.black">
            {sessionData?.user?.name}
          </Typography>
        </ListItemText>
        {openAccount ? (
          <Image src={ArrowUpIcon} width={20} height={20} alt="arrow_up" />
        ) : (
          <Image src={ArrowDownIcon} width={20} height={20} alt="arrow_down" />
        )}
      </ListItemButton>

      <Collapse in={openAccount} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Stack direction="column" spacing={1} ml={2} mr={2}>
            {menus.map((menu) => (
              <ItemMenuMobile menu={menu} key={menu.title} handleCloseMenu={handleCloseMenu} />
            ))}

            <StyleListItemButton onClick={handleSignOut}>
              <ListItemIcon sx={{ minWidth: 20, mr: 0.5 }}>
                <Image src={LogOutIcon} alt="icon" width={20} height={20} />
              </ListItemIcon>

              <ListItemText>
                <Typography color="base.black" variant="body2">
                  {t('menu.log_out')}
                </Typography>
              </ListItemText>
            </StyleListItemButton>
          </Stack>
        </List>
      </Collapse>
    </List>
  )
}

export { AccountMobile }
