import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useCommentNodeContext } from '../context'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActiveComment: React.FC = () => {
  const { handleSetActive } = useCommentNodeContext()
  const handleOpenComment = (event: React.MouseEvent<HTMLDivElement>) => {
    handleSetActive(event.currentTarget)
  }

  return (
    <Box onClick={handleOpenComment} sx={{ cursor: 'pointer' }}>
      <Image src={CommentActiveIcon} alt="comment icon" />
    </Box>
  )
}
export { InActiveComment }
