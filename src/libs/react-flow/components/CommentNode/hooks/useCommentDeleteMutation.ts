import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowCommentNode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useCommentDeleteMutation = () => {
  const removeComment = useRFStore((state) => state.removeComment)
  const addComment = useRFStore((state) => state.addComment)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const { t } = useTranslation('common')
  const utils = api.useContext()

  const mutation = api.comment.delete.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id)
      removeComment(variables.id)

      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.remove_comment'), {
        variant: 'error',
      })
      if (ctx?.prevData) addComment(ctx.prevData as ReactFlowCommentNode)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentDeleteMutation }
