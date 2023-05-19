import { MenuProps, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { BoxComment, ButtonAction, CommentActive, HeaderComment } from './styled'

type Props = {
  handleClose: () => void
} & MenuProps

const Active: React.FC<Props> = ({ open, onClose, anchorPosition, handleClose }) => {
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
            Comment
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
        <CommentItem />
        <CommentForm />
      </BoxComment>
    </CommentActive>
  )
}

export { Active }
