import Image from 'next/image'
import React from 'react'
import { useCommentNodeContext } from '../context'
import { ButtonAction } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActiveComment: React.FC = () => {
  const { handleSetCommentAnchor } = useCommentNodeContext()

  const handleOpenComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSetCommentAnchor(event.currentTarget)
  }

  return (
    <ButtonAction onClick={handleOpenComment} sx={{ borderRadius: '100%' }}>
      <Image src={CommentActiveIcon} alt="comment icon" />
    </ButtonAction>
  )
}
export { InActiveComment }
