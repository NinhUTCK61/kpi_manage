import { api } from '@/libs/api'
import { convertToReactFlowComment } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useCommentCreateMutation = () => {
  const addComment = useRFStore((state) => state.addComment)
  const removeComment = useRFStore((state) => state.removeComment)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.comment.create.useMutation({
    onSuccess(data) {
      // TODO: move onSuccess to onMutate
      const comment = convertToReactFlowComment(data)
      addComment(comment)
    },
    onError(_, variables) {
      enqueueSnackbar(t('error.create_comment'), {
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
