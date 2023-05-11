import { useRenameTemplate } from '@/features/template/hooks'
import { FileAction } from '@/features/template/types/template'
import { TemplateDataSchema } from '@/libs/schema'
import { Menu, MenuItem } from '@/libs/shared/components'
import {
  CardContent,
  IconButton,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ImageFile from 'public/assets/imgs/file.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { FormEvent, useRef, useState } from 'react'
import { z } from 'zod'
import { TemplateAction } from './TemplateAction'

type TemplateItemTypes = {
  handleFileAction(id: string, type: FileAction): void
  template: z.infer<typeof TemplateDataSchema>
  refetch(): void
}

const TemplateItem: React.FC<TemplateItemTypes> = ({ handleFileAction, template }) => {
  const router = useRouter()
  const { t } = useTranslation('home')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const inputNameRef = useRef<HTMLElement>(null)
  const [name, setName] = useState<string | null>(null)
  const mutationRename = useRenameTemplate()

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
    }, 0)
  }

  const onSaveName = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    if (name === '' || name === null || name === template.name) {
      setName(null)
      return
    }
    mutationRename.mutate(
      {
        id: template.template_id,
        name: name as string,
      },
      {
        onSettled() {
          setName(null)
        },
      },
    )
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
          title: t('permanently_delete_menu'),
          action: () => handleAction(FileAction.DeletePermanently),
        },
      ]
    : [
        {
          title: t('open'),
          action: () => router.push('file/' + template.template_id),
        },
        {
          title: t('thumbnail'),
          action: () => handleAction(FileAction.UpdateThumbnail),
        },
        {
          title: t('rename'),
          action: handleOpenChangeName,
        },
        {
          title: t('delete'),
          action: () => handleAction(FileAction.Delete),
          delete: true,
        },
      ]

  const redirectTemplate = () => {
    !template.deleted_at &&
      router.push({
        pathname: 'file/' + template.template_id,
      })
  }

  return (
    <Card elevation={0}>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <Image src={MenuIcon} alt="menu" />
          </IconButton>
        }
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
        <Image
          src={template.image_url || ImageFile}
          alt="file"
          style={{ cursor: template.deleted_at ? 'default' : 'pointer' }}
          width={268}
          height={206}
        />
      </CardContent>

      <TemplateAction
        onSaveName={onSaveName}
        template={template}
        name={name}
        handleChangeName={handleChangeName}
        inputNameRef={inputNameRef}
      />
    </Card>
  )
}

const MenuItemFile = styled(MenuItem)({
  borderBottom: 'none',
})

const MenuItemFileDelete = styled(MenuItem)(({ theme }) => ({
  borderBottom: 'none',
  color: theme.palette.red[400],
}))

const Card = styled(MuiCard)(({ theme }) => ({
  maxWidth: 268,
  borderRadius: 12,
  position: 'relative',
  border: `1px solid ${theme.palette.greyScale[300]}`,
}))

const CardHeader = styled(MuiCardHeader)({
  position: 'absolute',
  right: 5,
  top: 5,
  padding: 0,
})

export { TemplateItem }
