import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const useCommentUpdateMutation = () => {
  const utils = api.useContext()
  const updateComment = useRFStore((state) => state.updateComment)
  const getComment = useRFStore((state) => state.getComment)
  const { t } = useTranslation('common')

  const mutation = api.comment.update.useMutation({
    onMutate(variables) {
      updateComment(variables)

      const prevData = getComment(variables.id)
      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.update_comment'), {
        variant: 'error',
      })

      if (ctx?.prevData) {
        const comment = {
          id: ctx?.prevData.id,
          content: ctx?.prevData.data.content,
          x: ctx?.prevData.data.x,
          y: ctx?.prevData.data.y,
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
