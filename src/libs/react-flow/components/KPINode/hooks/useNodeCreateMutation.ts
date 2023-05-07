import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeCreateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const removeNode = useRFStore((state) => state.removeNode)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.node.create.useMutation({
    async onMutate(variables) {
      updateNode({ ...variables, type: 'kpi' })
    },
    onError(_, variables) {
      enqueueSnackbar(t('error.create_node'), {
        variant: 'error',
      })

      removeNode(variables.id)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useNodeCreateMutation }
