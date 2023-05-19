import { Menu, MenuProps, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { BoxComment, HeaderComment } from './styled'

const Active: React.FC<MenuProps> = ({ open, onClose, anchorPosition }) => {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      <BoxComment>
        <HeaderComment>
          <Typography variant="body1" fontWeight="600">
            Comment
          </Typography>

          <Stack spacing={1} direction="row" alignItems="center">
            <Image src={MenuIcon} alt="menu icon" />
            <Image src={CloseIcon} alt="close_icon" />
          </Stack>
        </HeaderComment>
        <CommentItem />
        <CommentForm />
      </BoxComment>
    </Menu>
  )
}

export { Active }
