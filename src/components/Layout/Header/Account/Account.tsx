import { IconButton, ListItemIcon, Tooltip, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import ArrowDownIcon from 'public/assets/imgs/arrow_down.png'
import NotificationIcon from 'public/assets/imgs/noti.png'
import ChangeIcon from 'public/assets/svgs/change_pass.svg'
import LogOutIcon from 'public/assets/svgs/log_out.svg'
import PrivacyIcon from 'public/assets/svgs/privacy.svg'
import ProfileIcon from 'public/assets/svgs/profile.svg'
import { useState } from 'react'
import { Avatar, Menu, MenuItem, StackName } from './Menu'

const Account = () => {
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
      title: 'Edit profile',
      icon: ProfileIcon,
      handle: handleClose,
    },
    {
      title: 'Change password',
      icon: ChangeIcon,
      handle: handleClose,
    },
    {
      title: ' Privacy Policy',
      icon: PrivacyIcon,
      handle: handleClose,
    },
    {
      title: 'Log Out',
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
            <Image src={ArrowDownIcon} alt="down" />
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
            <Typography color="black">{item.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export { Account }
