import { Stack } from '@mui/material'
import { useCommentNodeContext } from '../context'
import { CommentItem } from './CommentItem'
import { CommentReplyForm } from './CommentReplyForm'

const ListComment = () => {
  const { data } = useCommentNodeContext()

  return (
    <Stack maxHeight={400} sx={{ overflowY: 'auto' }}>
      <CommentItem isLast={false} data={data} />

      {data.replies.map((comment, index) => (
        <CommentItem isLast={index === data.replies.length - 1} key={comment.id} data={comment} />
      ))}

      <CommentReplyForm commentId={data.id} />
    </Stack>
  )
}

export { ListComment }
