import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const useCommentReplyUpdateMutation = () => {
  const utils = api.useContext()
  const updateCommentReply = useRFStore((state) => state.updateCommentReply)
  const getCommentReply = useRFStore((state) => state.getCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { t } = useTranslation('common')

  const mutation = api.comment.updateReply.useMutation({
    onMutate(variables) {
      if (nodeFocused) {
        const comment_id = nodeFocused.id
        updateCommentReply({ ...variables, comment_id })

        const prevData = getCommentReply(variables.id, comment_id)
        return { prevData }
      }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.update_comment_reply'), {
        variant: 'error',
      })
      if (ctx?.prevData) {
        const data = {
          id: ctx?.prevData.id,
          comment_id: ctx?.prevData.comment_id,
          content: ctx?.prevData.content,
        }
        updateCommentReply(data)
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}
export { useCommentReplyUpdateMutation }
