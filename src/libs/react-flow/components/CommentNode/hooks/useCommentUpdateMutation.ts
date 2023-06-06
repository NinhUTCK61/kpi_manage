import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowCommentNode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useCommentUpdateMutation = () => {
  const utils = api.useContext()
  const updateComment = useRFStore((state) => state.updateComment)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const { t } = useTranslation('common')

  const mutation = api.comment.update.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id) as ReactFlowCommentNode | null
      updateComment(variables)

      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.update_comment'), {
        variant: 'error',
      })

      if (ctx?.prevData) {
        const comment = {
          id: ctx.prevData.id,
          content: ctx.prevData.data.content,
          x: ctx.prevData.data.x,
          y: ctx.prevData.data.y,
        }
        updateComment(comment)
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}
export { useCommentUpdateMutation }
