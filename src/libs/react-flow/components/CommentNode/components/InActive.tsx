import { Stack } from '@mui/material'
import Image from 'next/image'
import { IconCommentImage } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

type Props = {
  handleOpen: (event: React.MouseEvent) => void
}

const InActive = ({ handleOpen }: Props) => {
  return (
    <Stack onClick={handleOpen}>
      <IconCommentImage>
        <Image src={CommentActiveIcon} alt="comment_icon" />
      </IconCommentImage>
    </Stack>
  )
}
export { InActive }
