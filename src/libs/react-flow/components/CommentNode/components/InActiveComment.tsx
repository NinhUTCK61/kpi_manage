import Image from 'next/image'
import React from 'react'
import { useCommentNodeContext } from '../context'
import { ButtonAction } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActiveComment: React.FC = () => {
  const { handleSetActive } = useCommentNodeContext()
  const handleOpenComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSetActive(event.currentTarget)
  }

  return (
    <ButtonAction onClick={handleOpenComment}>
      <Image src={CommentActiveIcon} alt="comment icon" />
    </ButtonAction>
  )
}
export { InActiveComment }
