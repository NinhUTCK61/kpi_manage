import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useSpeechBallonCreateMutation = () => {
  const { t } = useTranslation('file')
  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)
  const utils = api.useContext()

  const mutation = api.speechBallon.create.useMutation({
    onSuccess(data) {
      const dataConvert = convertToReactFlowSpeechBallonSingle(data)
      addSpeechBallon(dataConvert, true)
    },
    onError(_, variables) {
      enqueueSnackbar(t('err.create_speech_ballon'), {
        variant: 'error',
      })
      removeSpeechBallon(variables.id)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useSpeechBallonCreateMutation }
