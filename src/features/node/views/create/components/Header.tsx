import { useLikeTemplate, useRenameTemplate } from '@/features/template/hooks'
import { api } from '@/libs/api'
import { black } from '@/libs/config/theme'
import { useRFStore } from '@/libs/react-flow'
import { Menu, MenuItem } from '@/libs/shared/components'
import { Account } from '@/libs/shared/components/Layout/Header/Account'
import { AppBar } from '@/libs/shared/components/Layout/Header/AppBar'
import { Language } from '@/libs/shared/components/Layout/Header/Language'
import { StackContainer } from '@/libs/shared/components/Layout/StackContainer'
import { Button, InputBase, Stack, Typography, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowDownIcon from 'public/assets/svgs/arrow_down.svg'
import ArrowLeftIcon from 'public/assets/svgs/arrow_left_account.svg'
import LogoHeader from 'public/assets/svgs/logo_header.svg'
import { FormEvent, useEffect, useRef, useState } from 'react'

const HeaderTemplate: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation('file')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [name, setName] = useState<string | null>(null)
  const { mutationTemplate: mutationRename } = useRenameTemplate()
  const { mutationTemplate: mutationLike } = useLikeTemplate()
  const inputNameRef = useRef<HTMLElement>(null)
  const templateId = useRFStore((state) => state.templateId)

  const { data: template } = api.template.byId.useQuery(
    {
      id: templateId,
    },
    {
      initialData: {
        name: 'New Template',
      },
    },
  )

  const openMenu = Boolean(anchorEl)

  const handleOpenChangeName = () => {
    setName(template.name)
  }

  useEffect(() => {
    if (name && inputNameRef.current) {
      inputNameRef.current.focus()
    }
  }, [name])

  const handleLike = () => {
    mutationLike.mutate({ id: template.template_id, is_favorite: !template.is_favorite })
  }

  const menu = [
    {
      title: t('rename'),
      action: handleOpenChangeName,
    },
    {
      title: t(template.is_favorite ? 'remove_favorite' : 'favorite'),
      action: handleLike,
    },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

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

  return (
    <AppBar elevation={0}>
      <StackContainer>
        <Stack direction="row" spacing={19.75} alignItems="center">
          <Image
            src={LogoHeader}
            alt="logo-header"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          />
        </Stack>

        {name !== null ? (
          <Stack component="form" onSubmit={onSaveName}>
            <InputBaseStyled
              value={name}
              onChange={handleChangeName}
              onBlur={() => onSaveName()}
              inputRef={inputNameRef}
            />
          </Stack>
        ) : (
          <Button
            disableRipple
            onClick={handleClick}
            endIcon={<Image src={openMenu ? ArrowLeftIcon : ArrowDownIcon} alt="down" />}
          >
            <TextName>{template.name}</TextName>
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          id="status-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          PaperProps={{
            style: {
              borderRadius: 12,
            },
          }}
          elevation={1}
        >
          {menu.map((item) => (
            <MenuItem key={item.title} sx={{ width: 240 }} onClick={item.action}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
        <Stack direction="row" alignItems="center">
          <Language />

          <Account />
        </Stack>
      </StackContainer>
    </AppBar>
  )
}

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  height: 24,
  background: theme.palette.customPrimary[100],
  color: theme.palette.common.black,
  fontWeight: 600,
  width: 200,
  fontSize: 15,
  lineHeight: '22px',
}))

const TextName = styled(Typography)({
  fontWeight: 600,
  maxWidth: 240,
  fontSize: 19,
  lineHeight: '26px',
  color: black[800],
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
})

export { HeaderTemplate }
