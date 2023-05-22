import { Stack } from '@mui/material'
import { useCommentNodeContext } from '../context'
import { CommentItem } from './CommentItem'

const ListComment = () => {
  const { data } = useCommentNodeContext()

  return (
    <Stack>
      <CommentItem data={data} />

      {data?.replies.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </Stack>
  )
}

export { ListComment }
