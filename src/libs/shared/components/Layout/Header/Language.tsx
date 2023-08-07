import { Menu } from '@/libs/shared/components/Menu'
import { IconButton, MenuItem, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import EnglishIcon from 'public/assets/svgs/english.svg'
import JapanIcon from 'public/assets/svgs/japanese.svg'
import { useState } from 'react'

type StyleMenuItemType = {
  active?: boolean
}

const Language: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const {
    t,
    i18n: { language },
  } = useTranslation('common')
  const changLanguage = (locale: string) => {
    const { pathname, asPath, query } = router

    router.push({ pathname, query }, asPath, { locale })
  }

  const languages = [
    {
      id: 'en',
      icon: EnglishIcon,
      title: t('english'),
    },
    {
      id: 'jp',
      icon: JapanIcon,
      title: t('japan'),
    },
  ]

  const checkLangActive = (href: string) => {
    return router.locale === href
  }

  return (
    <>
      <Item
        direction="row"
        alignItems="center"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Image src={languages.find((e) => e.id === language)?.icon} alt="english" />

        <TextLanguage>{languages.find((e) => e.id === language)?.title}</TextLanguage>

        <IconButton size="small" sx={{ p: 0, display: { xs: 'none', lg: 'inline-flex' } }}>
          <Image src={open ? ArrowLeftIcon : ArrowDownIcon} alt="down" />
        </IconButton>
      </Item>
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
        disableAutoFocusItem
      >
        {languages.map((e) => (
          <StyleMenuItem
            key={e.id}
            onClick={() => changLanguage(e.id)}
            active={checkLangActive(e.id)}
            disableRipple
          >
            <Image src={e.icon} alt={e.title} height={20} width={20} />

            <Typography ml={0.75} variant="body2">
              {e.title}
            </Typography>
          </StyleMenuItem>
        ))}
      </Menu>
    </>
  )
}

const Item = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
})

const TextLanguage = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  width: 64,
  marginLeft: 6,
  textAlign: 'center',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

const StyleMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyleMenuItemType>(({ theme, active }) => ({
  backgroundColor: active ? theme.palette.customPrimary[0] : theme.palette.common.white,
  height: theme.spacing(6.75),
  borderBottom: `1px solid ${theme.palette.greyScale[200]}`,
  fontSize: 15,
  lineHeight: '22px',
  color: theme.palette.common.black,
}))

export { Language }
