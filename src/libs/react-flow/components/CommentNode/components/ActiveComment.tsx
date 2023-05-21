import { MenuProps, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { CommentReplyForm } from './CommentReplyForm'
import { ListComment } from './ListComment'
import { BoxComment, ButtonAction, CommentActive, HeaderComment } from './styled'

type ActiveCommentProps = {
  handleClose: () => void
} & MenuProps

const ActiveComment: React.FC<ActiveCommentProps> = ({ open, anchorEl, handleClose }) => {
  const { t } = useTranslation('file')

  return (
    <CommentActive
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
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
            <ButtonAction>
              <Image src={MenuIcon} alt="menu" />
            </ButtonAction>

            <ButtonAction onClick={handleClose}>
              <Image src={CloseIcon} alt="close" />
            </ButtonAction>
          </Stack>
        </HeaderComment>
        <ListComment />

        <CommentReplyForm />
      </BoxComment>
    </CommentActive>
  )
}

export { ActiveComment }
