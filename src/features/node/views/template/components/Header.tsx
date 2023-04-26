import { base } from '@/libs/config/theme'
import { Menu, MenuItem } from '@/libs/shared/components'
import { Account } from '@/libs/shared/components/Layout/Header/Account'
import { AppBar } from '@/libs/shared/components/Layout/Header/AppBar'
import { Language } from '@/libs/shared/components/Layout/Header/Language'
import { StackContainer } from '@/libs/shared/components/Layout/StackContainer'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { useState } from 'react'

const HeaderTemplate = () => {
  const router = useRouter()
  const { t } = useTranslation('file')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const menu = [
    {
      title: t('rename'),
    },
    {
      title: t('favorite'),
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
          disableRipple
          onClick={handleClick}
          sx={{ color: base.black }}
          endIcon={<Image src={openMenu ? ArrowLeftIcon : ArrowDownIcon} alt="down" />}
        >
          Name of file
        </Button>

        <Menu
          anchorEl={anchorEl}
          id="status-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          PaperProps={{
            style: {
              borderRadius: 12,
            },
          }}
          elevation={1}
        >
          {menu.map((item) => (
            <MenuItem key={item.title} sx={{ width: 240 }}>
              {item.title}
            </MenuItem>
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
