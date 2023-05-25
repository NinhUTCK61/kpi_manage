import { base, greyScale } from '@/libs/config/theme'
import { CommentOutputType } from '@/libs/schema/comment'
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
import { useOnClickOutside } from 'usehooks-ts'
import { ButtonAction, InputStyled } from './styled'

import { useRFStore } from '@/libs/react-flow/hooks'
import { useCommentReplyDeleteMutation, useCommentReplyUpdateMutation } from '../hooks'
type CommentItemProps = {
  data: CommentOutputType
  isLast?: boolean
}

const CommentReplyItem: React.FC<CommentItemProps> = ({ data, isLast }) => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const { data: session } = useSession()
  const [content, setContent] = useState<string | null>()
  const { t } = useTranslation('file')
  const { mutate: updateReply } = useCommentReplyUpdateMutation()
  const { mutate: deleteReply } = useCommentReplyDeleteMutation()
  const updateCommentReply = useRFStore((state) => state.updateCommentReply)

  const scrollTo = (el: HTMLDivElement) => {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenEdit = () => {
    setContent(data.content)
  }

  const handleCloseEdit = () => {
    setContent(null)
  }

  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event?.target.value)
  }

  const handleSaveContentChange = () => {
    updateCommentReply(data.id, content as string, data.comment_id)
  }

  const handleDeleteCommentReply = () => {
    deleteReply(data)
  }

  const ref = useRef(null)

  useOnClickOutside(ref, handleCloseEdit)

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
            <ButtonAction onClick={handleOpenEdit}>
              <Image src={MenuIcon} alt="menu icon" />
            </ButtonAction>
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
