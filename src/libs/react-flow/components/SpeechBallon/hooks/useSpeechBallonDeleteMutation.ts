import { api } from '@/libs/api'
import { getSpeechBallon } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useSpeechBallonDeleteMutation = () => {
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)
  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const nodes = useRFStore((state) => state.nodes)
  const { t } = useTranslation('common')
  const utils = api.useContext()

  const mutation = api.speechBallon.delete.useMutation({
    onMutate(variables) {
      const prevData = getSpeechBallon(nodes, variables.id)
      removeSpeechBallon(variables.id)

      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.remove_comment'), {
        variant: 'error',
      })
      if (ctx?.prevData) addSpeechBallon(ctx.prevData)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useSpeechBallonDeleteMutation }
