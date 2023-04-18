import { IconButton, ListItemIcon, Tooltip, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import ChangeIcon from 'public/assets/svgs/change_pass.svg'
import LogOutIcon from 'public/assets/svgs/log_out.svg'
import NotificationIcon from 'public/assets/svgs/noti.svg'
import PrivacyIcon from 'public/assets/svgs/privacy.svg'
import ProfileIcon from 'public/assets/svgs/profile.svg'
import { useState } from 'react'
import { Avatar, Menu, MenuItem, StackName } from './Menu'

const Account = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { data: sessionData } = useSession()

  const menu = [
    {
      title: t('menu.edit'),
      icon: ProfileIcon,
      handle: handleClose,
    },
    {
      title: t('menu.change_password'),
      icon: ChangeIcon,
      handle: handleClose,
    },
    {
      title: t('menu.privacy_policy'),
      icon: PrivacyIcon,
      handle: handleClose,
    },
    {
      title: t('menu.log_out'),
      icon: LogOutIcon,
      handle: signOut,
    },
  ]

  return (
    <>
      <Image
        src={NotificationIcon}
        alt="notification-icon"
        height={20}
        width={20}
        style={{ margin: '18px ' }}
      />
      <Tooltip title="Account settings">
        <StackName direction="row" spacing={1} onClick={handleClick}>
          <Avatar>H</Avatar>
          <Typography variant="body2">{sessionData?.user?.name}</Typography>
          <IconButton
            size="small"
            sx={{ ml: 2, p: 0 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Image src={open ? ArrowLeftIcon : ArrowDownIcon} alt="down" />
          </IconButton>
        </StackName>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menu.map((item) => (
          <MenuItem key={item.title} onClick={item.handle as () => void}>
            <ListItemIcon>
              <Image src={item.icon} alt="edit icon" />
            </ListItemIcon>
            <Typography color="black" variant="body2">
              {item.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export { Account }