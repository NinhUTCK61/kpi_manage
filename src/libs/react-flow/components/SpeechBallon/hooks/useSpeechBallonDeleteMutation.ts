import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store'
import { ReactFlowSpeechBallonNode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useSpeechBallonDeleteMutation = (updateReason?: UpdateStateReason) => {
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)
  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { t } = useTranslation('file')
  const utils = api.useContext()

  const mutation = api.speechBallon.delete.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id)
      removeSpeechBallon(variables.id, updateReason)

      setNodeFocused(null)
      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('err.remove_speech_ballon'), {
        variant: 'error',
      })
      if (ctx?.prevData) addSpeechBallon(ctx.prevData as ReactFlowSpeechBallonNode)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useSpeechBallonDeleteMutation }
