import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = () => {
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)

  const utils = api.useContext()

  const mutation = api.speechBallon.update.useMutation({
    onMutate(data) {
      updateSpeechBallon(data)
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
