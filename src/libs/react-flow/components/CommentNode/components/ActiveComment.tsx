import { useRFStore } from '@/libs/react-flow/hooks'
import { Popover, Stack, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useState } from 'react'
import { useCommentNodeContext } from '../context'
import { useCommentDeleteMutation } from '../hooks'
import { ListComment } from './ListComment'
import { ButtonAction, ButtonMenu, CommentActive, CommentContainer, HeaderComment } from './styled'

const ActiveComment: React.FC = () => {
  const { t } = useTranslation('file')
  const { active, handleSetActive } = useCommentNodeContext()
  const { data: session } = useSession()
  const { data } = useCommentNodeContext()
  const { mutate: deleteComment } = useCommentDeleteMutation()
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)

  const handleClose = () => {
    handleSetActive(null)
    setNodeFocused(null)
  }

  const handleDeleteComment = () => {
    deleteComment(data)
  }

  const [activeMenu, setActiveMenu] = useState<HTMLButtonElement | null>()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setActiveMenu(null)
  }

  return (
    <CommentActive
      open={!!active}
      anchorEl={active}
      onClose={handleClose}
      autoFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
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
                <Popover
                  open={!!activeMenu}
                  anchorEl={activeMenu}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Stack borderRadius={0.5} overflow="hidden">
                    <ButtonMenu onClick={handleDeleteComment}>Delete Thread</ButtonMenu>
                  </Stack>
                </Popover>
              </Stack>
            )}

            <ButtonAction onClick={handleClose}>
              <Image src={CloseIcon} alt="close" />
            </ButtonAction>
          </Stack>
        </HeaderComment>

        <ListComment />
      </CommentContainer>
    </CommentActive>
  )
}

export { ActiveComment }
