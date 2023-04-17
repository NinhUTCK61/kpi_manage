import { Menu, MenuItem } from '@/libs/shared/components/Layout/Header/Account/Menu'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  CardActions as MuiCardActions,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { formatDistance } from 'date-fns'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import LikeIcon from 'public/assets/svgs/likes_pink.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useState } from 'react'

const FileItem: React.FC = () => {
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card sx={{ maxWidth: 268, borderRadius: 3, position: 'relative' }}>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <Image src={MenuIcon} alt="menu" />
          </IconButton>
        }
        sx={{ position: 'absolute', right: 10, top: 5, p: 0 }}
      />
      <Menu
        anchorEl={anchorEl}
        id="file-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            ml: 3.5,
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItemFile onClick={handleClose}>{t('open')}</MenuItemFile>
        <MenuItemFile onClick={handleClose}>{t('thumbnail')}</MenuItemFile>
        <MenuItemFile onClick={handleClose}>{t('rename')}</MenuItemFile>
        <MenuItemFileDelete onClick={handleClose}>{t('delete')}</MenuItemFileDelete>
      </Menu>

      <CardContent sx={{ p: 0 }}>
        <Image src={ImageFile} alt="file" />
      </CardContent>
      <CardActions>
        <Stack width="100%">
          <Stack direction="row" justifyContent="space-between">
            <Typography color="base.black" fontWeight={600}>
              Circle Simple Mind
            </Typography>
            <Image src={LikeIcon} alt="like" />
          </Stack>
          <Typography variant="body2" color="greyScale.500">
            {formatDistance(new Date('2023-04-05T09:00:00Z'), new Date(), { addSuffix: true })}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  )
}

const CardActions = styled(MuiCardActions)(({ theme }) => ({
  padding: '11px 16px',
  background: theme.palette.greyScale[200],
}))

const MenuItemFile = styled(MenuItem)({
  borderBottom: 'none',
})

const MenuItemFileDelete = styled(MenuItem)(({ theme }) => ({
  borderBottom: 'none',
  color: theme.palette.red[400],
}))

export { FileItem }
