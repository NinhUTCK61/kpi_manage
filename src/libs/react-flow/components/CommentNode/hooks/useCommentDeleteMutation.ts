import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useCommentDeleteMutation = () => {
  const removeComment = useRFStore((state) => state.removeComment)
  const utils = api.useContext()

  const mutation = api.comment.delete.useMutation({
    onMutate(data) {
      removeComment(data.id)
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

export { useCommentDeleteMutation }
