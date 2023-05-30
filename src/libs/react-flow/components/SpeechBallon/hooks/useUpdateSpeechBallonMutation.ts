import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useUpdateSpeechBallonMutation = () => {
  const { t } = useTranslation(['file'])

  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)

  const utils = api.useContext()

  const mutation = api.speechBallon.update.useMutation({
    onMutate(data) {
      updateSpeechBallon(data)
    },
    onError(_, _variables) {
      enqueueSnackbar(t('err.update_speech_ballon'), {
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
