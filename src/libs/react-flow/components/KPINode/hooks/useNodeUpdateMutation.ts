import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeUpdateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.node.multipleUpdate.useMutation({
    async onMutate(variables) {
      updateNode({ ...(variables[0] as KPINodeType), type: 'kpi' })
    },
    onError() {
      enqueueSnackbar(t('error.internal_server_error'), {
        variant: 'error',
      })
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useNodeUpdateMutation }
