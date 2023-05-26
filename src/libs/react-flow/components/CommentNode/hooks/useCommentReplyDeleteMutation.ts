import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentReplyDeleteMutation = () => {
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const utils = api.useContext()

  const mutation = api.comment.deleteReply.useMutation({
    onMutate(data) {
      if (nodeFocused) removeCommentReply({ ...data, comment_id: nodeFocused.id })
    },
    onError() {
      enqueueSnackbar('err.remove_comment', {
        variant: 'error',
      })
    },
    onSettled(_, context) {
      utils.node.list.invalidate()
      console.log(context)
    },
  })

  return mutation
}

export { useCommentReplyDeleteMutation }
