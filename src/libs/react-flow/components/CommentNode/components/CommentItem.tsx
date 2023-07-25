import { base, greyScale } from '@/libs/config/theme'
import { isCommentNode } from '@/libs/react-flow/helper'
import { CommentOutputType, CommentReplyOutputType } from '@/libs/schema/comment'
import { getImageUrl } from '@/libs/utils/misc'
import { ClickAwayListener, Popper, Stack, Typography } from '@mui/material'
import { formatDistance } from 'date-fns'
import { enAU, ja } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import {
  useCommentReplyDeleteMutation,
  useCommentReplyUpdateMutation,
  useCommentUpdateMutation,
} from '../hooks'
import { CommentAction } from './CommentAction'
import { ButtonAction, ButtonMenu } from './styled'
import AvatarDefault from '/public/assets/svgs/avatar_default.svg'

type CommentItemProps = {
  data: CommentReplyOutputType | CommentOutputType
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const {
    i18n: { language },
  } = useTranslation('home')
  const commentRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('file')
  const { data: session } = useSession()
  const [content, setContent] = useState<string | null>(null)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>()
  const isComment = isCommentNode(data)

  const { mutate: updateReply } = useCommentReplyUpdateMutation()
  const { mutate: updateComment } = useCommentUpdateMutation()
  const { mutate: deleteReply } = useCommentReplyDeleteMutation()

  const handleCloseEdit = () => {
    setContent(null)
  }

  useOnClickOutside(commentRef, handleCloseEdit)

  const handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const handleSaveContentChange = () => {
    if (content?.trim())
      if (isComment) {
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

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  const handleOpenEdit = () => {
    setContent(data.content)
    handleCloseMenu()
  }

  return (
    <Stack p={2} bgcolor="base.white" sx={{ borderTop: content && `1px solid ${greyScale[300]}` }}>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Stack direction="row" spacing={1}>
          <Stack width={24} height={24} borderRadius="100%" direction="row" alignItems="center">
            <Image
              src={data.author.image ? getImageUrl(data?.author.image) : AvatarDefault}
              alt="file"
              width={24}
              height={24}
              style={{ borderRadius: '100%' }}
            />
          </Stack>

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
              <ButtonAction onClick={handleOpenMenu}>
                <Image src={MenuIcon} alt="menu icon" />
              </ButtonAction>

              <Popper open={!!menuAnchor} anchorEl={menuAnchor} disablePortal sx={{ zIndex: 10 }}>
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <Stack borderRadius={0.5} overflow="hidden">
                    <ButtonMenu onClick={handleOpenEdit}>{t('edit_comment')}</ButtonMenu>

                    {!isComment && (
                      <ButtonMenu onClick={handleDeleteCommentReply}>
                        {t('delete_comment')}
                      </ButtonMenu>
                    )}
                  </Stack>
                </ClickAwayListener>
              </Popper>
            </Stack>
          )}
        </Stack>
      </Stack>

      <CommentAction
        commentRef={commentRef}
        currentContent={data.content}
        content={content}
        handleChangeContent={handleChangeContent}
        handleCloseEdit={handleCloseEdit}
        handleSaveContentChange={handleSaveContentChange}
      />
    </Stack>
  )
}

export { CommentItem }
