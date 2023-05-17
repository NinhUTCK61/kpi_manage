import { Input, Menu, MenuProps } from '@mui/material'
import Image from 'next/image'
import CommentIcon from '/public/assets/svgs/comment_create.svg'

const CommentInput: React.FC<MenuProps> = ({ open, onClose, anchorPosition }) => {
  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      <Image src={CommentIcon} alt="comment icon" />
      <Input name="comment" />
    </Menu>
  )
}

export { CommentInput }
