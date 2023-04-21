import { base } from '@/libs/config/theme'
import { Menu, MenuItem } from '@/libs/shared/components'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { useState } from 'react'
import { Account } from '../../../../../libs/shared/components/Layout/Header/Account'
import { AppBar } from '../../../../../libs/shared/components/Layout/Header/AppBar'
import { Language } from '../../../../../libs/shared/components/Layout/Header/Language'
import { StackContainer } from '../../../../../libs/shared/components/Layout/StackContainer'

const HeaderTemplate = () => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const menu = [
    {
      title: t('all_file'),
    },
    {
      title: t('deleted_file'),
    },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={19.75} alignItems="center">
          <Image
            src={LogoHeader}
            alt="logo-header"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          />
        </Stack>
        <Button
          aria-controls={openMenu ? 'status-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          disableRipple
          onClick={handleClick}
          sx={{ color: base.black }}
          startIcon={<Image src={openMenu ? ArrowLeftIcon : ArrowDownIcon} alt="down" />}
        >
          Name
        </Button>

        <Menu
          anchorEl={anchorEl}
          id="status-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            style: {
              borderRadius: 12,
            },
          }}
          elevation={1}
        >
          {menu.map((item) => (
            <MenuItem key={item.title}>{item.title}</MenuItem>
          ))}
        </Menu>
        <Stack direction="row" alignItems="center">
          <Language />
          <Account />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

export { HeaderTemplate }
