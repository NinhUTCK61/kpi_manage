import { useRFStore } from '@/libs/react-flow/hooks'
import Image from 'next/image'
import React from 'react'
import { useCommentNodeContext } from '../context'
import { ButtonAction } from './styled'
import CommentActiveIcon from '/public/assets/svgs/comment_icon.svg'

const InActiveComment: React.FC = () => {
  const { handleSetActive } = useCommentNodeContext()
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { data } = useCommentNodeContext()

  const handleOpenComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSetActive(event.currentTarget)
    setNodeFocused(data.id)
  }

  return (
    <ButtonAction onClick={handleOpenComment} sx={{ borderRadius: '100%' }}>
      <Image src={CommentActiveIcon} alt="comment icon" />
    </ButtonAction>
  )
}
export { InActiveComment }
