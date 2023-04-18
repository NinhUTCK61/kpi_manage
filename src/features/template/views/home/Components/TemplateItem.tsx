import { useModalState } from '@/libs/hooks'
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
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import ImageFile from 'public/assets/imgs/file.png'
import LikeIcon from 'public/assets/svgs/likes_pink.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { KeyboardEvent, useRef, useState } from 'react'
import { Menu, MenuItem } from '../../../../auth/components'

type TemplateItemTypes = {
  handleSelectNodeDelete(id: string): void
  handleSelectNodeThumbnail(id: string): void
}

const FileItem: React.FC<TemplateItemTypes> = ({
  handleSelectNodeDelete,
  handleSelectNodeThumbnail,
}) => {
  const { t } = useTranslation('home')
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

  const { isOpen: isRename, onToggle: onToggleRename } = useModalState()

  const handleOpenChangeName = () => {
    onToggleRename()
    setTimeout(() => {
      if (inputNameRef.current) {
        inputNameRef.current.focus()
      }
    }, 200)
  }

  const onSaveName = () => {
    enqueueSnackbar(t('rename_success'), {
      variant: 'success',
      description: t('description_rename_success') as string,
    })
    onToggleRename()
  }

  const onSaveNameKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSaveName()
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const setNodeDelete = () => {
    handleSelectNodeDelete('id')
    handleClose()
  }

  const setNodeThumbnail = () => {
    handleSelectNodeThumbnail('id')
    handleClose()
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
        <MenuItemFile onClick={setNodeThumbnail}>{t('thumbnail')}</MenuItemFile>
        <MenuItemFile onClick={handleOpenChangeName}>{t('rename')}</MenuItemFile>
        <MenuItemFileDelete onClick={setNodeDelete}>{t('delete')}</MenuItemFileDelete>
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
                onBlur={onSaveName}
                inputRef={inputNameRef}
                onKeyPress={onSaveNameKeyPress}
              />
            ) : (
              <TextName>{name}</TextName>
            )}
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

export { FileItem }
