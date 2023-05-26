import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'

const useCommentReplyUpdateMutation = () => {
  const utils = api.useContext()
  const updateCommentReply = useRFStore((state) => state.updateCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const mutation = api.comment.updateReply.useMutation({
    onMutate(variables) {
      if (nodeFocused) updateCommentReply({ ...variables, comment_id: nodeFocused.id })
    },
    onError(err) {
      console.log(err)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}
export { useCommentReplyUpdateMutation }
