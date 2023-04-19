import { base } from '@/libs/config/theme'
import { useModalState } from '@/libs/hooks'
import { Layout, Menu, MenuItem } from '@/libs/shared/components'
import { DialogAction, DialogThumbnail } from '@/libs/shared/components/Dialog'
import { DialogActionType } from '@/libs/shared/types/utils'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import AddIcon from 'public/assets/svgs/plus.svg'
import { useState } from 'react'
import { FileAction, StatusTemplate, TemplateTypes } from '../../types/template'
import { ButtonCreate, TemplateItem } from './components'

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

  const [status, setStatus] = useState<StatusTemplate>(StatusTemplate.all)
  const menu = [
    {
      id: StatusTemplate.all,
      title: t('all_file'),
      handle: handleClose,
    },
    {
      id: StatusTemplate.deleted,
      title: t('deleted_file'),
      handle: handleClose,
    },
  ]

  const [fakeData, setFakeData] = useState<TemplateTypes[] | undefined>(
    Array(8)
      .fill(0)
      .map((e, index) => {
        return {
          id: `${index}`,
          name: 'Template 1',
          rootNodeId: '1',
          delete_at: '',
          public_url: '',
          image_url: '',
        }
      }),
  )

  const [fakeDataDelete, setFakeDataDelete] = useState<TemplateTypes[] | undefined>(
    Array(3)
      .fill(0)
      .map((e, index) => {
        return {
          id: `${index}`,
          name: 'Template 1',
          rootNodeId: '1',
          delete_at: '19-05-2022',
          public_url: '',
          image_url: '',
        }
      }),
  )

  const [action, setAction] = useState<Exclude<FileAction, FileAction.UpdateThumbnail> | null>(null)
  const { isOpen: isOpenDialogAction, onOpen: openDialog, onClose: closeDialog } = useModalState()
  const {
    isOpen: isOpenThumbnail,
    onOpen: openDialogThumbnail,
    onClose: closeDialogThumbnail,
  } = useModalState()

  const [nodeId, setNodeId] = useState<string>()
  console.log(nodeId)

  const handleFileAction = (id: string, type: FileAction) => {
    setNodeId(id)
    if (type === FileAction.UpdateThumbnail) {
      openDialogThumbnail()
    } else {
      setAction(type)
      openDialog()
    }
  }

  const handleConfirmDelete = () => {
    fakeData?.pop()
    const _fakeData = fakeData
    setFakeData(_fakeData)
    enqueueSnackbar('', {
      variant: 'success',
      description: t('description_delete_success') as string,
    })
    closeDialog()
  }

  const handleConfirmDeletePer = () => {
    fakeDataDelete?.pop()
    const _fakeDataDelete = fakeDataDelete
    console.log({ _fakeDataDelete })
    setFakeDataDelete(_fakeDataDelete)
    enqueueSnackbar('', {
      variant: 'success',
      description: t('description_delete_success') as string,
    })
    closeDialog()
  }

  const handleConfirmThumbnail = () => {
    enqueueSnackbar('', {
      variant: 'success',
      description: t('description_set_thumbnail_success') as string,
    })
    closeDialogThumbnail()
  }

  const OPTION_ACTIONS = {
    [FileAction.Delete]: {
      title: t('delete_file'),
      description: t('detail_dialog_delete'),
      handleConfirm: handleConfirmDelete,
      type: 'delete',
      textSubmit: t('delete'),
    },
    [FileAction.Restore]: {
      title: t('restore'),
      description: t('detail_dialog_delete'),
      handleConfirm: handleConfirmDelete,
      type: 'warning',
      textSubmit: t('restore'),
    },
    [FileAction.DeletePermanently]: {
      title: t('permanently_delete'),
      description: t('detail_dialog_delete'),
      handleConfirm: handleConfirmDeletePer,
      type: 'warning',
      textSubmit: t('permanently_delete'),
    },
  }

  return (
    <Layout title={t('seo_title')}>
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
        {((status === StatusTemplate.all ? fakeData : fakeDataDelete) || []).map(
          (template, index) => (
            <Grid item lg={3} md={4} sm={5} xs={12} key={index}>
              <TemplateItem template={template} handleFileAction={handleFileAction} />
            </Grid>
          ),
        )}
      </Grid>
      {action && (
        <DialogAction
          open={isOpenDialogAction}
          handleClose={closeDialog}
          handleConfirm={OPTION_ACTIONS[action].handleConfirm}
          title={OPTION_ACTIONS[action].title}
          description={OPTION_ACTIONS[action].description}
          type={OPTION_ACTIONS[action].type as DialogActionType}
          textSubmit={OPTION_ACTIONS[action].textSubmit}
        />
      )}
      <DialogThumbnail
        open={isOpenThumbnail}
        handleClose={closeDialogThumbnail}
        handleConfirm={handleConfirmThumbnail}
      />
    </Layout>
  )
}

export { Home }
