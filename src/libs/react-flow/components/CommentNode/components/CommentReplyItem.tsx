import { base, greyScale } from '@/libs/config/theme'
import {
  CommentOutputType,
  CommentReplyOutputType,
  CreateCommentOutputType,
} from '@/libs/schema/comment'
import { ButtonStyle } from '@/libs/shared/components/Snackbar/styled'
import { Box, Stack, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import ImageFile from 'public/assets/imgs/file.png'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useRef, useState } from 'react'
import { Arrow, ButtonAction, ButtonMenu, InputStyled } from './styled'

import { Popover } from '@mui/material'
import { useOnClickOutside } from 'usehooks-ts'
import {
  useCommentReplyDeleteMutation,
  useCommentReplyUpdateMutation,
  useCommentUpdateMutation,
} from '../hooks'
type CommentItemProps = {
  data: CommentReplyOutputType | CommentOutputType
  isLast?: boolean
}

const CommentReplyItem: React.FC<CommentItemProps> = ({ data, isLast }) => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const { data: session } = useSession()
  const [content, setContent] = useState<string | null>()
  const { t } = useTranslation('file')
  const ref = useRef(null)
  const { mutate: updateReply } = useCommentReplyUpdateMutation()
  const { mutate: updateComment } = useCommentUpdateMutation()
  const { mutate: deleteReply } = useCommentReplyDeleteMutation()

  function isCommentNode(
    data: CommentReplyOutputType | CreateCommentOutputType,
  ): data is CreateCommentOutputType {
    return (
      (data as CreateCommentOutputType).x !== undefined &&
      (data as CreateCommentOutputType).y !== undefined
    )
  }

  const scrollTo = (el: HTMLDivElement) => {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCloseEdit = () => {
    setContent(null)
  }

  useOnClickOutside(ref, handleCloseEdit)

  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event?.target.value)
  }

  const handleSaveContentChange = () => {
    if (isCommentNode(data)) {
      const comment = {
        id: data.id,
        content: content as string,
        x: data.x,
        y: data.y,
      }
      updateComment(comment)
    } else {
      const comment = {
        id: data.id,
        content: content as string,
      }
      updateReply(comment)
    }
    handleCloseEdit()
  }

  const handleDeleteCommentReply = () => {
    deleteReply({ id: data.id })
  }

  const [activePoper, setActivePoper] = useState<null | HTMLButtonElement>()

  const handleOpenPoper = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActivePoper(event.currentTarget)
  }
  const handleClosePoper = () => {
    setActivePoper(null)
  }

  const handleOpenEdit = () => {
    setContent(data.content)
    handleClosePoper()
  }

  return (
    <Stack p={2} bgcolor="base.white" ref={isLast ? scrollTo : undefined}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Stack direction="row">
          <Box mr={1} width={24} height={24} borderRadius="100%">
            <Image src={data.author.image || ImageFile} alt="file" width={24} height={24} />
          </Box>

          <Typography variant="body2" color={base.black} fontWeight={600}>
            {data.author.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Typography variant="caption" fontWeight={400} color={greyScale[500]}>
            {formatDistance(data.created_at, new Date(), {
              addSuffix: true,
              locale: language === 'en' ? enAU : ja,
            })}
          </Typography>

          {session?.user.id === data.author_id && (
            <Stack>
              <ButtonAction onClick={handleOpenPoper}>
                <Image src={MenuIcon} alt="menu icon" />
              </ButtonAction>
              <Popover
                open={!!activePoper}
                anchorEl={activePoper}
                onClose={handleClosePoper}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: -14,
                }}
                PaperProps={{
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: 0,
                  },
                }}
              >
                <Arrow />
                <Stack borderRadius={0.5} overflow="hidden">
                  <ButtonMenu onClick={handleOpenEdit}>{t('edit_comment')}</ButtonMenu>
                  {!isCommentNode(data) && (
                    <ButtonMenu onClick={handleDeleteCommentReply}>
                      {t('delete_comment')}
                    </ButtonMenu>
                  )}
                </Stack>
              </Popover>
            </Stack>
          )}
        </Stack>
      </Stack>
      {content ? (
        <Stack direction="column" ref={ref}>
          <InputStyled value={content} onChange={handleChangeContent} multiline maxRows={10} />

          <Stack direction="row" justifyContent="flex-end">
            <ButtonStyle variant="outlined" sx={{ mr: 1 }} onClick={handleCloseEdit}>
              {t('cancel')}
            </ButtonStyle>

            <ButtonStyle variant="contained" onClick={handleSaveContentChange}>
              {t('save')}
            </ButtonStyle>
          </Stack>
        </Stack>
      ) : (
        <Typography
          variant="body2"
          color={greyScale[900]}
          whiteSpace="pre-line"
          sx={{ wordWrap: 'break-word' }}
        >
          {data.content}
        </Typography>
      )}
    </Stack>
  )
}

export { CommentReplyItem }
