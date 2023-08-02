import { useRenameTemplate } from '@/features/template/hooks'
import { FileAction } from '@/features/template/types/template'
import { TemplateDataSchema } from '@/libs/schema'
import { CustomLink, Menu, MenuItem } from '@/libs/shared/components'
import { getImageUrl } from '@/libs/utils/misc'
import {
  IconButton,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  styled,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ImageFile from 'public/assets/imgs/image_template_default.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { HEIGHT_TEMPLATE_ACTION, TemplateAction } from './TemplateAction'

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
  const { mutation: mutationRename } = useRenameTemplate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenChangeName = () => {
    setName(template.name)
  }

  useEffect(() => {
    if (name && inputNameRef.current) {
      inputNameRef.current.focus()
    }
  }, [name])

  const onSaveName = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    const nameStr = name?.trim() || ''

    if (nameStr === '' || nameStr === template.name) {
      setName(null)
      return
    }
    mutationRename.mutate(
      {
        id: template.template_id,
        name: nameStr,
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

  return (
    <>
      <Card elevation={0}>
        <CardHeader
          action={
            <IconButton onClick={handleClick}>
              <Image src={MenuIcon} alt="menu" />
            </IconButton>
          }
        />

        <CardContent>
          <CustomLink disabled={!!template.deleted_at} href={'file/' + template.template_id}>
            <Image
              src={template.image_url ? getImageUrl(template.image_url) : ImageFile}
              alt="file"
              priority
              style={{
                cursor: template.deleted_at ? 'default' : 'pointer',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              width={343}
              height={264}
            />
          </CustomLink>
        </CardContent>

        <TemplateAction
          onSaveName={onSaveName}
          template={template}
          name={name}
          handleChangeName={handleChangeName}
          inputNameRef={inputNameRef}
        />
      </Card>

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
    </>
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
  borderRadius: 12,
  position: 'relative',
  height: '100%',
  maxWidth: '100% !important',
  border: `1px solid ${theme.palette.greyScale[300]}`,
  [theme.breakpoints.up('sm')]: {
    maxWidth: 268,
  },
}))

const CardHeader = styled(MuiCardHeader)({
  position: 'absolute',
  right: 5,
  top: 5,
  padding: 0,
})

const CardContent = styled(MuiCardContent)({
  padding: '0 !important',
  height: `calc(100% - ${HEIGHT_TEMPLATE_ACTION}px)`,
})

export { TemplateItem }
