import { MenuItem, Menu as MuiMenu, Stack, Typography, alpha, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import EnglishIcon from 'public/assets/svgs/english.svg'
import JapanIcon from 'public/assets/svgs/japanese.svg'
import { useState } from 'react'

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
        <Typography ml={0.75} variant="body2" width={64} textAlign="center">
          {languages.find((e) => e.id === language)?.title}
        </Typography>
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
      >
        {languages.map((e) => (
          <MenuItem key={e.id} onClick={() => changLanguage(e.id)}>
            <Image src={e.icon} alt={e.title} height={20} width={20} />
            <Typography ml={0.75} variant="body2">
              {e.title}
            </Typography>
          </MenuItem>
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

const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}))

export { Language }
