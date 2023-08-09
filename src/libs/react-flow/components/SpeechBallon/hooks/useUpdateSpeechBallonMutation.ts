import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store/middleware'
import { SpeechBallonNodeType } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = (updateReason?: UpdateStateReason) => {
  const { t } = useTranslation('file')
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)
  const getNodeById = useRFStore((state) => state.getNodeById)
  const utils = api.useContext()
  const nodeFocused = useRFStore((state) => state.nodeFocused)

  const mutation = api.speechBallon.update.useMutation({
    onMutate(variables) {
      const prevData = getNodeById(variables.id)
      const hasPositionChanged = variables.x || variables.y

      let reason = updateReason ?? UpdateStateReason.UpdateSpeechBallonNodeData
      const isUpdateSize = (variables as Record<string, unknown>).defaultDimensions
      const isUpdatePosition =
        hasPositionChanged && (variables.x !== prevData?.data.x || variables.y !== prevData?.data.y)
      const isUndoRedo = updateReason === UpdateStateReason.OnUndoRedo

      if (isUpdateSize) {
        reason = UpdateStateReason.UpdateSpeechBallonNodeSize
      } else if (isUpdatePosition) {
        reason = UpdateStateReason.UpdateSpeechBallonNodePosition
      }

      updateSpeechBallon(
        variables,
        !!nodeFocused,
        isUndoRedo ? UpdateStateReason.OnUndoRedo : reason,
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
