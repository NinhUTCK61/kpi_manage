import { api } from '@/libs/api'
import { convertToReactFlowSpeechBallonSingle } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useSpeechBallonCreateMutation = () => {
  const addSpeechBallon = useRFStore((state) => state.addSpeechBallon)
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)
  const utils = api.useContext()

  const mutation = api.speechBallon.create.useMutation({
    onSuccess(data) {
      const dataConvert = convertToReactFlowSpeechBallonSingle(data)
<<<<<<< HEAD
      addSpeechBallon(dataConvert)
=======
      addSpeechBallon(dataConvert.data)
>>>>>>> 124d641 (fix(KM-72): create speechballon node)
    },
    onError(_, variables) {
      enqueueSnackbar('err.create_SpeechBallon', {
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
