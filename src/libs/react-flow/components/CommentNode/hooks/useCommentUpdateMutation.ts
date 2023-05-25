import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'

const useCommentUpdateMutation = () => {
  const utils = api.useContext()
  const updateComment = useRFStore((state) => state.updateComment)

  const mutation = api.comment.update.useMutation({
    onMutate(variables) {
      // TODO: move onSuccess to onMutate
      console.log(variables)
      updateComment(variables)
    },
    onSuccess(data) {
      console.log(data)
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
export { useCommentUpdateMutation }
