import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { SpeechBallon } from '@prisma/client'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = () => {
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)

  const utils = api.useContext()

  const mutation = api.speechBallon.update.useMutation({
    onMutate(data) {
      const dataConvert = convertToReactFlowSpeechBallonSingle(data as SpeechBallon)
      updateSpeechBallon(dataConvert)
    },
    onError(_, _variables) {
      enqueueSnackbar('err.create_SpeechBallon', {
        variant: 'error',
      })
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useUpdateSpeechBallonMutation }
