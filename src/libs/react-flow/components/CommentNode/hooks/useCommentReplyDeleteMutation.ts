import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useCommentReplyDeleteMutation = () => {
  const removeCommentReply = useRFStore((state) => state.removeCommentReply)
  const addCommentReply = useRFStore((state) => state.addCommentReply)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { t } = useTranslation('common')
  const utils = api.useContext()

  const mutation = api.comment.deleteReply.useMutation({
    onMutate(variables) {
      if (nodeFocused) {
        const comment_id = nodeFocused.id
        const data = removeCommentReply({ ...variables, comment_id })
        return { data }
      }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.remove_comment_reply'), {
        variant: 'error',
      })
      if (ctx?.data?.remove) addCommentReply(ctx.data.remove, ctx.data.commentReplyIndex)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useCommentReplyDeleteMutation }
