import { ClickAwayListener, Fade, Popper, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useCommentNodeContext } from '../context'
import { useCommentDeleteMutation } from '../hooks'
import { ListComment } from './ListComment'
import { ButtonAction, ButtonMenu, CommentContainer, HeaderComment } from './styled'

const ActiveComment: React.FC = () => {
  const { t } = useTranslation('file')
  const { commentAnchor, handleSetCommentAnchor } = useCommentNodeContext()
  const { data: session } = useSession()
  const { data } = useCommentNodeContext()
  const { mutate: deleteComment } = useCommentDeleteMutation()
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>()

  const handleCloseComment = () => {
    handleSetCommentAnchor(null)
  }

  const handleDeleteComment = () => {
    deleteComment(data)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
  }

  const commentRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(commentRef, handleCloseComment)

  return (
    <Popper
      open={!!commentAnchor}
      anchorEl={commentAnchor}
      placement="right"
      ref={commentRef}
      autoFocus
    >
      <ClickAwayListener onClickAway={handleCloseComment}>
        <Fade in={!!commentAnchor}>
          <CommentContainer>
            <HeaderComment direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" color="base.black" fontWeight="600">
                {t('comment_title')}
              </Typography>

              <Stack spacing={1} direction="row" alignItems="center">
                {session?.user.id === data.author_id && (
                  <Stack>
                    <ButtonAction onClick={handleOpenMenu}>
                      <Image src={MenuIcon} alt="menu icon" />
                    </ButtonAction>

                    <Popper
                      open={!!menuAnchor}
                      anchorEl={menuAnchor}
                      disablePortal
                      sx={{ zIndex: 10 }}
                    >
                      <ClickAwayListener onClickAway={handleCloseMenu}>
                        <Stack borderRadius={0.5} overflow="hidden">
                          <ButtonMenu onClick={handleDeleteComment}>
                            {t('delete_thread')}
                          </ButtonMenu>
                        </Stack>
                      </ClickAwayListener>
                    </Popper>
                  </Stack>
                )}

                <ButtonAction onClick={handleCloseComment}>
                  <Image src={CloseIcon} alt="close" />
                </ButtonAction>
              </Stack>
            </HeaderComment>

            <ListComment />
          </CommentContainer>
        </Fade>
      </ClickAwayListener>
    </Popper>
  )
}

export { ActiveComment }
