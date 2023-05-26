import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentRepliesCreateMutation = () => {
  const utils = api.useContext()
  const addCommentReply = useRFStore((state) => state.addCommentReply)
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const mutation = api.comment.createReply.useMutation({
    onSuccess(data) {
      // TODO: move onSuccess to onMutate
      addCommentReply(data)
    },
    onError(_, variables) {
      enqueueSnackbar('err.create_commentReply', {
        variant: 'error',
      })
      if (nodeFocused) removeCommentReply({ ...variables, comment_id: nodeFocused.id })
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentRepliesCreateMutation }
