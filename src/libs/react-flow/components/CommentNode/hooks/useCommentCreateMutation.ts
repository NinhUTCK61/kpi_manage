import { api } from '@/libs/api'
import { convertToReactFlowComment } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentCreateMutation = () => {
  const addComment = useRFStore((state) => state.addComment)
  const removeComment = useRFStore((state) => state.removeComment)
  const utils = api.useContext()

  const mutation = api.comment.create.useMutation({
    onSuccess(data) {
      // TODO: move onSuccess to onMutate
      const comment = convertToReactFlowComment(data)
      addComment(comment)
    },
    onError(_, variables) {
      enqueueSnackbar('err.create_comment', {
        variant: 'error',
      })
      removeComment(variables.id)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentCreateMutation }
