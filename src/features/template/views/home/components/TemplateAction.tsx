import { useLikeTemplate } from '@/features/template/hooks'
import { TemplateDataSchema } from '@/libs/schema'
import { InputBase, CardActions as MuiCardActions, Stack, Typography, styled } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import LikeIcon from 'public/assets/svgs/like_star_1.svg'
import UnLikeIcon from 'public/assets/svgs/unlike_star.svg'
import { Ref } from 'react'
import { z } from 'zod'

type TemplateActionTypes = {
  template: z.infer<typeof TemplateDataSchema>
  name: string | null
  onSaveName(): void
  handleChangeName(event: React.ChangeEvent<HTMLInputElement>): void
  inputNameRef: Ref<HTMLElement | null>
}

export const HEIGHT_TEMPLATE_ACTION = 68

const TemplateAction: React.FC<TemplateActionTypes> = ({
  template,
  name,
  onSaveName,
  handleChangeName,
  inputNameRef,
}) => {
  const {
    i18n: { language },
  } = useTranslation('home')

  const { mutation: mutationLike } = useLikeTemplate()

  const handleLike = () => {
    mutationLike.mutate({ id: template.template_id, is_favorite: !template.is_favorite })
  }

  return (
    <CardActions>
      <Stack width="100%">
        <Stack
          direction="row"
          justifyContent="space-between"
          component="form"
          onSubmit={onSaveName}
        >
          {name !== null ? (
            <InputRename
              value={name}
              onChange={handleChangeName}
              onBlur={() => onSaveName()}
              inputRef={inputNameRef as Ref<HTMLElement>}
            />
          ) : (
            <TextName>{template.name}</TextName>
          )}

          {!template.deleted_at && (
            <Image
              onClick={handleLike}
              src={template.is_favorite ? LikeIcon : UnLikeIcon}
              alt="like"
              style={{ cursor: 'pointer' }}
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
  )
}

const CardActions = styled(MuiCardActions)(({ theme }) => ({
  padding: '11px 16px',
  background: theme.palette.greyScale[200],
  height: HEIGHT_TEMPLATE_ACTION,
}))

const InputRename = styled(InputBase)(({ theme }) => ({
  height: 24,
  background: theme.palette.customPrimary[100],
  fontWeight: 600,
  color: theme.palette.common.black,
}))

const TextName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  maxWidth: 170,
  color: theme.palette.base.black,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

export { TemplateAction }
