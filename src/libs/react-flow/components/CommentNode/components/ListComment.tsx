import { Stack } from '@mui/material'
import { useCommentNodeContext } from '../context'
import { CommentReplyForm } from './CommentReplyForm'
import { CommentReplyItem } from './CommentReplyItem'

const ListComment = () => {
  const { data } = useCommentNodeContext()

  return (
    <Stack maxHeight={400} sx={{ overflowY: 'auto' }}>
      <CommentReplyItem data={data} />

      {data.replies.map((comment, index) => (
        <CommentReplyItem
          isLast={index === data.replies.length - 1}
          key={comment.id}
          data={comment}
        />
      ))}

      <CommentReplyForm commentId={data.id} />
    </Stack>
  )
}

export { ListComment }
