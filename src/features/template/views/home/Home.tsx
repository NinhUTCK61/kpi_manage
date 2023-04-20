import { api } from '@/libs/api'
import { base } from '@/libs/config/theme'
import { useModalState } from '@/libs/hooks'
import { DialogAction, DialogThumbnail, Layout, Menu, MenuItem } from '@/libs/shared/components'
import { DialogActionType } from '@/libs/shared/types/utils'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import AddIcon from 'public/assets/svgs/plus.svg'
import { useState } from 'react'
import { FileAction } from '../../types/template'
import { ButtonCreate, TemplateItem } from './components'

const Home = () => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [nodeId, setNodeId] = useState<string>()
  const [action, setAction] = useState<Exclude<FileAction, FileAction.UpdateThumbnail> | null>(null)
  const [isTrash, setIsTrash] = useState<boolean>(false)
  const openMenu = Boolean(anchorEl)
  const {
    isOpen: isOpenThumbnail,
    onOpen: openDialogThumbnail,
    onClose: closeDialogThumbnail,
  } = useModalState()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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

  const handleFileAction = (id: string, type: FileAction) => {
    setNodeId(id)
    if (type === FileAction.UpdateThumbnail) {
      openDialogThumbnail()
    } else {
      setAction(type)
    }
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
      handleConfirm: () => handleConfirmDelete(),
      type: 'delete',
      textSubmit: t('delete'),
    },
    [FileAction.Restore]: {
      title: t('restore'),
      description: t('detail_dialog_restore'),
      handleConfirm: () => handleConfirmRestore(),
      type: 'warning',
      textSubmit: t('restore'),
    },
    [FileAction.DeletePermanently]: {
      title: t('permanently_delete'),
      description: t('detail_dialog_delete_per'),
      handleConfirm: () => handleConfirmDelete(true),
      type: 'delete',
      textSubmit: t('permanently_delete'),
    },
  }

  const { data, refetch } = api.template.getListTemplate.useQuery({
    isTrash: isTrash,
  })
  const { mutate: create } = api.template.createTemplate.useMutation()

  const { mutate: deleteTemplate } = api.template.deleteTemplate.useMutation()

  const { mutate: restore } = api.template.restoreTemplate.useMutation()

  const handleCreateTemplate = () => {
    create(
      {},
      {
        onSuccess: (data) => {
          router.push(`/template/${data.id}`)
        },
        onError: (err) => {
          const error = String(err.message)
          const description = t(error)
          enqueueSnackbar(t('create_failed'), { variant: 'error', description })
        },
      },
    )
  }

  const handleConfirmDelete = (is_permanently?: boolean) => {
    deleteTemplate(
      {
        id: String(nodeId),
        is_permanently,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('', {
            variant: 'success',
            description: t('description_delete_success') as string,
          })
          setAction(null)
          refetch()
        },
        onError: (err) => {
          const error = String(err.message)
          const description = t(error)
          enqueueSnackbar(t(is_permanently ? 'permanently_delete_failed' : 'delete_failed'), {
            variant: 'error',
            description,
          })
        },
      },
    )
  }

  const handleConfirmRestore = () => {
    restore(
      {
        id: String(nodeId),
      },
      {
        onSuccess: () => {
          enqueueSnackbar(t('restore_success'), {
            variant: 'success',
            description: t('description_restore_success') as string,
          })
          setAction(null)
          refetch()
        },
        onError: (err) => {
          const error = String(err.message)
          const description = t(error)
          enqueueSnackbar(t('restore_failed'), { variant: 'error', description })
        },
      },
    )
  }

  return (
    <Layout title={t('seo_title')}>
      <ButtonCreate
        variant="contained"
        startIcon={<Image src={AddIcon} alt="add" />}
        onClick={handleCreateTemplate}
      >
        {t('create')}
      </ButtonCreate>
      <Stack direction="row" justifyContent="space-between" mb={1.5}>
        <Typography variant="h5" fontWeight={700}>
          {t('my_files')}
        </Typography>
        <Button
          aria-controls={openMenu ? 'status-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          disableRipple
          onClick={handleClick}
          sx={{ color: base.black }}
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
      <Grid container rowSpacing={4} spacing={2} columns={{ md: 12, xl: 15 }}>
        {(data || []).map((template, index) => (
          <Grid item key={index} xl="auto" lg={3} md={4} sm={5} xs={12}>
            <TemplateItem
              template={template}
              handleFileAction={handleFileAction}
              refetch={refetch}
            />
          </Grid>
        ))}
      </Grid>
      {action && (
        <DialogAction
          open={!!action}
          handleClose={() => setAction(null)}
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
