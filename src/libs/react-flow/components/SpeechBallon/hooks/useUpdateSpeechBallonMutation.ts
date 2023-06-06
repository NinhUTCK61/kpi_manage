import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = () => {
  const { t } = useTranslation(['file'])
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const utils = api.useContext()

  const mutation = api.speechBallon.update.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id)
      updateSpeechBallon(variables)
      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.update_speech'), {
        variant: 'error',
      })
      if (ctx?.prevData) {
        const speech_ballon = convertToReactFlowSpeechBallonSingle(
          ctx.prevData.data as SpeechBallonNodeType,
        )
        updateSpeechBallon(speech_ballon, true)
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useUpdateSpeechBallonMutation }
