import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/assets/svgs/close.svg'
import MenuIcon from 'public/assets/svgs/more.svg'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { BoxComment, HeaderComment, IconCommentImage } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const Active = () => {
  return (
    <Stack direction="row" sx={{ cursor: 'context-menu' }} spacing={1}>
      <IconCommentImage>
        <Image src={CommentActiveIcon} alt="comment-icon" />
      </IconCommentImage>

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
    </Stack>
  )
}

export { Active }
