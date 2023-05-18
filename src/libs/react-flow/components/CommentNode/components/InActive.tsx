import { Stack } from '@mui/material'
import Image from 'next/image'
import { IconCommentImage } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActive = () => {
  return (
    <Stack>
      <IconCommentImage>
        <Image src={CommentActiveIcon} alt="comment_icon" />
      </IconCommentImage>
    </Stack>
  )
}
export { InActive }
