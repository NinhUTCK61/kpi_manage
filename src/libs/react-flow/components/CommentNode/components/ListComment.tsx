import { useCommentNodeContext } from '../context'
import { CommentItem } from './CommentItem'
import { CommentReplyForm } from './CommentReplyForm'
import { ListCommentContainer } from './styled'

const ListComment = () => {
  const { data } = useCommentNodeContext()

  return (
    <ListCommentContainer>
      <CommentItem data={data} />

      {data.replies.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}

      <CommentReplyForm commentId={data.id} />
    </ListCommentContainer>
  )
}

export { ListComment }
