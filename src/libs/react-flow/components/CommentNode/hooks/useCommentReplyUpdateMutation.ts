import { api } from '@/libs/api'
import { getCommentReply } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useCommentReplyUpdateMutation = () => {
  const utils = api.useContext()
  const updateCommentReply = useRFStore((state) => state.updateCommentReply)
  const nodes = useRFStore((state) => state.nodes)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { t } = useTranslation('common')

  const mutation = api.comment.updateReply.useMutation({
    onMutate(variables) {
      if (nodeFocused) {
        const comment_id = nodeFocused.id
        const prevData = getCommentReply(nodes, variables.id, comment_id)
        updateCommentReply({ ...variables, comment_id })

        return { prevData }
      }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.update_comment_reply'), {
        variant: 'error',
      })
      if (ctx?.prevData) {
        const data = {
          id: ctx.prevData.id,
          comment_id: ctx.prevData.comment_id,
          content: ctx.prevData.content,
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
