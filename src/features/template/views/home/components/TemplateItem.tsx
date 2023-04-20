import { useApiTemplate } from '@/features/template/hooks'
import { FileAction } from '@/features/template/types/template'
import { useTranslateError } from '@/libs/hooks'
import { TemplateDataSchema } from '@/libs/schema'
import { Menu, MenuItem } from '@/libs/shared/components'
import {
  CardContent,
  CardHeader,
  IconButton,
  Input,
  Card as MuiCard,
  CardActions as MuiCardActions,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ImageFile from 'public/assets/imgs/file.png'
import LikeIcon from 'public/assets/svgs/likes_pink.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import UnLikeIcon from 'public/assets/svgs/un_like.svg'
import { FormEvent, useRef, useState } from 'react'
import { z } from 'zod'

type TemplateItemTypes = {
  handleFileAction(id: string, type: FileAction): void
  template: z.infer<typeof TemplateDataSchema>
  refetch(): void
}

const TemplateItem: React.FC<TemplateItemTypes> = ({ handleFileAction, template, refetch }) => {
  const router = useRouter()
  const {
    t,
    i18n: { language },
  } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const inputNameRef = useRef<HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [name, setName] = useState<string>('')
  const { showError } = useTranslateError()
  const { renameTemplate, likeTemplate } = useApiTemplate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenChangeName = () => {
    setName(template.name)
    setTimeout(() => {
      if (inputNameRef.current) {
        inputNameRef.current.focus()
      }
    }, 200)
  }

  const onSaveName = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    renameTemplate(template.template_id, name, () => setName(''))
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleAction = (type: FileAction) => {
    handleFileAction(template.template_id, type)
    handleClose()
  }

  const menuItem = template.deleted_at
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
          action: () => handleOpenChangeName(),
        },
        {
          title: t('delete'),
          action: () => handleAction(FileAction.Delete),
          delete: true,
        },
      ]

  const redirectTemplate = () => {
    !template.deleted_at && router.push('template/' + template.template_id)
  }

  const handleLike = () => {
    likeTemplate(template.template_id, template.is_favorite)
  }

  return (
    <Card elevation={0}>
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
            borderRadius: 3,
          },
        }}
        elevation={1}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
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

      <CardContent sx={{ p: 0 }} onClick={redirectTemplate}>
        <ImagePointer src={ImageFile} alt="file" />
      </CardContent>
      <CardActions>
        <Stack width="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            component="form"
            onSubmit={onSaveName}
          >
            {!!name ? (
              <InputRename
                value={name}
                onChange={handleChangeName}
                onBlur={() => onSaveName()}
                inputRef={inputNameRef}
              />
            ) : (
              <TextName>{template.name}</TextName>
            )}
            {!template.deleted_at && (
              <ImagePointer
                onClick={handleLike}
                src={template.is_favorite ? LikeIcon : UnLikeIcon}
                alt="like"
              />
            )}
          </Stack>
          <Typography variant="body2" color="greyScale.500">
            {formatDistance(template.created_at, new Date(), {
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

const Card = styled(MuiCard)(({ theme }) => ({
  maxWidth: 268,
  borderRadius: 12,
  position: 'relative',
  border: `1px solid ${theme.palette.greyScale[300]}`,
}))

const ImagePointer = styled(Image)({ cursor: 'pointer' })

export { TemplateItem }
