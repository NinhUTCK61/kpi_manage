import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { useCommentNodeContext } from '../context'
import { ListComment } from './ListComment'
import { BoxComment, ButtonAction, CommentActive, HeaderComment } from './styled'

const ActiveComment: React.FC = () => {
  const { t } = useTranslation('file')
  const { active, handleSetActive } = useCommentNodeContext()

  const handleClose = () => {
    handleSetActive(null)
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
      <BoxComment>
        <HeaderComment>
          <Typography variant="body1" color="base.black" fontWeight="600">
            {t('comment_title')}
          </Typography>

          <Stack spacing={1.1} direction="row" alignItems="center">
            <ButtonAction sx={{ position: 'relative' }}>
              <Image src={MenuIcon} alt="menu" />
            </ButtonAction>

            <ButtonAction onClick={handleClose}>
              <Image src={CloseIcon} alt="close" />
            </ButtonAction>
          </Stack>
        </HeaderComment>

        <ListComment />
      </BoxComment>
    </CommentActive>
  )
}

export { ActiveComment }
