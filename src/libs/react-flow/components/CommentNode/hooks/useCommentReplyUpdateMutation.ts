import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'

const useCommentReplyUpdateMutation = () => {
  const utils = api.useContext()
  const updateCommentReply = useRFStore((state) => state.updateCommentReply)

  const mutation = api.comment.updateReply.useMutation({
    onSuccess(data) {
      updateCommentReply(data.comment_id, data.id, data.content)
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
