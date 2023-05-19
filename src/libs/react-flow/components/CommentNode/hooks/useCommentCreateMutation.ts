import { api } from '@/libs/api'
import { convertToReactFlowComment } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'

const useCommentCreateMutation = () => {
  const addComment = useRFStore((state) => state.addComment)
  const utils = api.useContext()

  const mutation = api.comment.create.useMutation({
    async onMutate(variables) {
      variables
    },
    onSuccess(data) {
      const comment = convertToReactFlowComment(data)
      addComment(comment)
    },
    onError(error) {
      console.log(error)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentCreateMutation }
