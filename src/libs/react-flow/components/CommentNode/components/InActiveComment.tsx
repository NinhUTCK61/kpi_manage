import { Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useCommentNodeContext } from '../context'
import { IconStyled } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActiveComment: React.FC = () => {
  const { setActive } = useCommentNodeContext()
  const handleOpenComment = (event: React.MouseEvent<HTMLElement>) => {
    setActive(event.currentTarget)
  }

  return (
    <Stack onClick={handleOpenComment}>
      <IconStyled>
        <Image src={CommentActiveIcon} alt="comment icon" />
      </IconStyled>
    </Stack>
  )
}
export { InActiveComment }
