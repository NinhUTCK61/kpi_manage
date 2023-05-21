import { Stack } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { IconStyled } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

type InActiveCommentProps = {
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void
}

const InActiveComment: React.FC<InActiveCommentProps> = ({ handleOpen }) => {
  return (
    <Stack onClick={handleOpen}>
      <IconStyled>
        <Image src={CommentActiveIcon} alt="comment icon" />
      </IconStyled>
    </Stack>
  )
}
export { InActiveComment }
