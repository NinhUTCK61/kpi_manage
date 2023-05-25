import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentReplyDeleteMutation = () => {
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)
  const utils = api.useContext()

  const mutation = api.comment.deleteReply.useMutation({
    onMutate(data) {
      removeCommentReply(data.comment_id as string, data.id as string)
    },
    onError() {
      enqueueSnackbar('err.remove_comment', {
        variant: 'error',
      })
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentReplyDeleteMutation }
