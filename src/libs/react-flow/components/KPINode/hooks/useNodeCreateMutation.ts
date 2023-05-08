import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType, ReactFlowNode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { getDifferenceNodeByPosition } from '../utils'

const useNodeCreateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const removeNode = useRFStore((state) => state.removeNode)
  const nodes = useRFStore((state) => state.nodes)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const { mutate: mulUpdate } = api.node.multipleUpdate.useMutation()

  const mutation = api.node.create.useMutation({
    async onMutate(variables) {
      updateNode(variables)
    },
    onError(_, variables) {
      enqueueSnackbar(t('error.create_node'), {
        variant: 'error',
      })

      removeNode(variables.id)
    },
    onSuccess(_, variables) {
      // TODO: update node position after re-layout
      const queryNodes =
        utils.node.list
          .getData({ template_id: variables.template_id })
          ?.nodes.filter((node) => node.type === 'kpi') || []

      const kpiNodes = nodes.filter((node) => node.type === 'kpi' && node.data.id !== variables.id)

      console.log(122112, kpiNodes, queryNodes)
      // Get difference node position
      const diff = getDifferenceNodeByPosition(kpiNodes, queryNodes as ReactFlowNode[])

      if (diff.length) {
        mulUpdate(diff.map((n) => n.data) as KPINodeType[])
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useNodeCreateMutation }
