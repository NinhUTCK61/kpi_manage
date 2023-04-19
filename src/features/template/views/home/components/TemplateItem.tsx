import { FileAction, TemplateTypes } from '@/features/template/types/template'
import { useModalState } from '@/libs/hooks'
import { Menu, MenuItem } from '@/libs/shared/components'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Input,
  CardActions as MuiCardActions,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import ImageFile from 'public/assets/imgs/file.png'
import LikeIcon from 'public/assets/svgs/likes_pink.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { FormEvent, useRef, useState } from 'react'

type TemplateItemTypes = {
  handleFileAction(id: string, type: FileAction): void
  template: TemplateTypes
}

const TemplateItem: React.FC<TemplateItemTypes> = ({ handleFileAction, template }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputNameRef = useRef<HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [name, setName] = useState<string>('Circle Simple Mind')

  const { isOpen: isRename, onOpen: openRename, onClose: closeRename } = useModalState()

  const handleOpenChangeName = () => {
    openRename()
    setTimeout(() => {
      if (inputNameRef.current) {
        inputNameRef.current.focus()
      }
    }, 200)
  }

  const onSaveName = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    enqueueSnackbar(t('rename_success'), {
      variant: 'success',
      description: t('description_rename_success') as string,
    })
    closeRename()
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleAction = (type: FileAction) => {
    handleFileAction('id', type)
    handleClose()
  }

  const isDelete = template.delete_at !== ''

  const menuItem = isDelete
    ? [
        {
          title: t('restore'),
          action: () => handleAction(FileAction.Restore),
        },
        {
          title: t('permanently_delete'),
          action: () => handleAction(FileAction.DeletePermanently),
        },
      ]
    : [
        {
          title: t('open'),
          action: () => handleClose(),
        },
        {
          title: t('thumbnail'),
          action: () => handleAction(FileAction.UpdateThumbnail),
        },
        {
          title: t('rename'),
          action: () => handleOpenChangeName,
        },
        {
          title: t('delete'),
          action: () => handleAction(FileAction.Delete),
          delete: true,
        },
      ]

  return (
    <Card sx={{ maxWidth: 268, borderRadius: 3, position: 'relative' }} elevation={0}>
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
            ml: 1,
            boxShadow: '0px 2px 40px rgba(17, 17, 17, 0.08)',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        elevation={0}
      >
        {menuItem.map((menu) =>
          menu.delete ? (
            <MenuItemFileDelete key={menu.title} onClick={menu.action}>
              {menu.title}
            </MenuItemFileDelete>
          ) : (
            <MenuItemFile key={menu.title} onClick={menu.action}>
              {menu.title}
            </MenuItemFile>
          ),
        )}
      </Menu>

      <CardContent sx={{ p: 0 }}>
        <Image src={ImageFile} alt="file" />
      </CardContent>
      <CardActions>
        <Stack width="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            component="form"
            onSubmit={onSaveName}
          >
            {isRename ? (
              <InputRename
                value={name}
                onChange={handleChangeName}
                onBlur={() => onSaveName()}
                inputRef={inputNameRef}
              />
            ) : (
              <TextName>{name}</TextName>
            )}
            <Image src={LikeIcon} alt="like" />
          </Stack>
          <Typography variant="body2" color="greyScale.500">
            {formatDistance(new Date('2023-04-05T09:00:00Z'), new Date(), {
              addSuffix: true,
              locale: language === 'en' ? enAU : ja,
            })}
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

const InputRename = styled(Input)(({ theme }) => ({
  maxWidth: 170,
  height: 24,
  background: theme.palette.customPrimary[100],
  fontWeight: 600,
}))

const TextName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  maxWidth: 170,
  color: theme.palette.base.black,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

export { TemplateItem }
