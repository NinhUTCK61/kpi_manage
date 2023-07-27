import { base } from '@/libs/config/theme'
import { Menu, MenuItem } from '@/libs/shared/components'
import { Button, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import { useState } from 'react'

type SelectStatusTypes = {
  isTrash: boolean
  setIsTrash(isTrash: boolean): void
}

const SelectStatus: React.FC<SelectStatusTypes> = ({ isTrash, setIsTrash }) => {
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const menu = [
    {
      title: t('all_file'),
      handle: () => setIsTrash(false),
    },
    {
      title: t('deleted_file'),
      handle: () => setIsTrash(true),
    },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} order={1}>
      <Title>{isTrash ? t('deleted_file_title') : t('my_files')}</Title>

      <Button
        aria-controls={openMenu ? 'status-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        disableRipple
        onClick={handleClick}
        sx={{ color: base.black, fontWeight: { xs: 400, sm: 600 } }}
        startIcon={<Image src={openMenu ? ArrowLeftIcon : ArrowDownIcon} alt="down" />}
      >
        {isTrash ? t('deleted_file') : t('all_file')}
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
          <MenuItem key={item.title} onClick={item.handle}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}

export { SelectStatus }

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: 700,
  textTransform: 'uppercase',
  [theme.breakpoints.down('sm')]: {
    fontWeight: 600,
    fontSize: 19,
    lineHeight: '26px',
  },
}))
