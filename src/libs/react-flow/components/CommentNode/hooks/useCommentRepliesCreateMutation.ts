import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'

const useCommentRepliesCreateMutation = () => {
  const utils = api.useContext()
  const createCommentReply = useRFStore((state) => state.createCommentReply)
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)

  const mutation = api.comment.createReply.useMutation({
    onSuccess(data) {
      // TODO: move onSuccess to onMutate
      createCommentReply(data)
    },
    onError(_, variables) {
      removeCommentReply(variables.comment_id, variables.id)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentRepliesCreateMutation }
