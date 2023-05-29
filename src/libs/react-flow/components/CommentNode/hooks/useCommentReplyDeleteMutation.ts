import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const useCommentReplyDeleteMutation = () => {
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)
  const addCommentReply = useRFStore((state) => state.addCommentReply)
  const getCommentReply = useRFStore((state) => state.getCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { t } = useTranslation('common')
  const utils = api.useContext()

  const mutation = api.comment.deleteReply.useMutation({
    onMutate(variables) {
      if (nodeFocused) {
        const comment_id = nodeFocused.id
        console.log(comment_id)
        const data = removeCommentReply({ ...variables, comment_id })

        const prevData = getCommentReply(variables.id, comment_id)
        return { prevData, data }
      }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.remove_comment_reply'), {
        variant: 'error',
      })
      if (ctx?.prevData && ctx?.data)
        addCommentReply(ctx.prevData, ctx.data.remove, ctx.data.commentReplyIndex)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentReplyDeleteMutation }
