import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store/middleware'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = () => {
  const { t } = useTranslation('file')
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const utils = api.useContext()
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const mutation = api.speechBallon.update.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id)

      const hasPositionChanged = variables.x || variables.y
      const isUpdatePosition =
        hasPositionChanged && (variables.x !== prevData?.data.x || variables.y !== prevData?.data.y)
      updateSpeechBallon(
        variables,
        !!nodeFocused,
        isUpdatePosition
          ? UpdateStateReason.UpdateSpeechBallonNodePosition
          : UpdateStateReason.UpdateSpeechBallonNodeData,
      )
      return { prevData }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('err.update_speech_ballon'), {
        variant: 'error',
      })
      if (ctx?.prevData) {
        const speech_ballon = convertToReactFlowSpeechBallonSingle(
          ctx.prevData.data as SpeechBallonNodeType,
        )
        updateSpeechBallon(speech_ballon, !!nodeFocused)
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useUpdateSpeechBallonMutation }
