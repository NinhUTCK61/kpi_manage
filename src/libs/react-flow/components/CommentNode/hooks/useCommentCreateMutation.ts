import { api } from '@/libs/api'
import { convertToReactFlowComment } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentCreateMutation = () => {
  const addComment = useRFStore((state) => state.addComment)
  const utils = api.useContext()

  const mutation = api.comment.create.useMutation({
    onSuccess(data) {
      const comment = convertToReactFlowComment(data)
      addComment(comment)
    },
    onError(error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      })
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentCreateMutation }
