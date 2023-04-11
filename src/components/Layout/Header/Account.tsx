import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import {
  Divider,
  ListItemIcon,
  MenuItem,
  Avatar as MuiAvatar,
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  Tooltip,
  Typography,
  styled,
} from '@mui/material'
import { Stack } from '@mui/system'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import ArrowDownIcon from 'public/assets/imgs/arrow_down.png'
import NotificationIcon from 'public/assets/imgs/noti.png'
import { useState } from 'react'

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
            sx={{ ml: 2 }}
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
        <MenuItem onClick={handleClose}>
          <Avatar />
          <Typography variant="body1" color="black">
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar />
          <Typography variant="body1" color="black">
            My account
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1" color="black">
            Add another account
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1" color="black">
            Settings
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="body1" color="black">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const Avatar = styled(MuiAvatar)({
  width: 28,
  height: 28,
})

const IconButton = styled(MuiIconButton)({
  padding: 0,
})

const Menu = styled(MuiMenu)({
  '.MuiMenu-paper': {
    overflow: 'visible',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
})

const StackName = styled(Stack)({
  alignItems: 'center',
  cursor: 'pointer',
})

export { Account }
