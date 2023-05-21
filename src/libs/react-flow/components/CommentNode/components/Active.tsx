import { MenuProps, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { CommentForm } from './CommentForm'
import { ListComment } from './ListComment'
import { BoxComment, ButtonAction, CommentActive, HeaderComment } from './styled'

type Props = {
  handleClose: () => void
} & MenuProps

const Active: React.FC<Props> = ({ open, onClose, anchorPosition, handleClose }) => {
  const { t } = useTranslation('file')

  return (
    <CommentActive
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
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

        <CommentForm />
      </BoxComment>
    </CommentActive>
  )
}

export { Active }
