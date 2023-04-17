import { base } from '@/libs/config/theme'
import { Layout } from '@/libs/shared/components'
import { Menu, MenuItem } from '@/libs/shared/components/Layout/Header/Account/Menu'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import AddIcon from 'public/assets/svgs/plus.svg'
import { useState } from 'react'
import { ButtonCreate } from './ButtonCreate'
import { FileItem } from './FileItem'

enum StatusFile {
  all,
  deleted,
}

const Home = () => {
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [status, setStatus] = useState<StatusFile>(StatusFile.all)
  const menu = [
    {
      id: StatusFile.all,
      title: t('all_file'),
      handle: handleClose,
    },
    {
      id: StatusFile.deleted,
      title: t('deleted_file'),
      handle: handleClose,
    },
  ]

  const fakeData = Array(8).fill(0)

  return (
    <Layout title="KPI Master">
      <ButtonCreate variant="contained" startIcon={<Image src={AddIcon} alt="add" />}>
        {t('create')}
      </ButtonCreate>
      <Stack direction="row" justifyContent="space-between" mb={1.5}>
        <Typography variant="h5" fontWeight={700}>
          {t('my_files')}
        </Typography>
        <Button
          aria-controls={open ? 'status-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ color: base.black }}
          startIcon={<Image src={open ? ArrowLeftIcon : ArrowDownIcon} alt="down" />}
        >
          {menu.find((e) => e.id === status)?.title}
        </Button>

        <Menu
          anchorEl={anchorEl}
          id="status-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {menu.map((item) => (
            <MenuItem key={item.title} onClick={() => setStatus(item.id)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
      <Grid container rowSpacing={4} spacing={2} columns={{ md: 12, xl: 15 }}>
        {fakeData.map((file, index) => (
          <Grid item lg={3} md={4} sm={5} xs={12} key={index}>
            <FileItem />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default Home
