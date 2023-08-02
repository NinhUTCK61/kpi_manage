import { api } from '@/libs/api'
import { getDifferenceNodesByPosition, useNodeUpdateMutation } from '@/libs/react-flow'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store/middleware'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { ReactFlowKPINodeOutputType } from '@/libs/schema/node'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { filterKpiNodes } from '../utils'

const useNodeCreateMutation = (reason?: UpdateStateReason) => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const removeKPINode = useRFStore((state) => state.removeKPINode)

  const nodes = useRFStore((state) => state.nodes)
  const utils = api.useContext()
  const { t } = useTranslation('common')
  const { bulkUpdate } = useNodeUpdateMutation(reason ?? UpdateStateReason.BulkUpdateNodeInternal)

  const mutation = api.node.create.useMutation({
    async onMutate(variables) {
      updateNode({ ...variables, is_saved: true }, false, reason ?? UpdateStateReason.AddKPINode)
    },
    onError(_, variables) {
      enqueueSnackbar(t('error.create_node'), {
        variant: 'error',
      })

      removeKPINode(variables.id)
      utils.node.list.invalidate()
    },
    onSuccess(_, variables) {
      // update node position after re-layout
      const nodesData = utils.node.list.getData({ template_id: variables.template_id })
      const queryNodes = nodesData?.nodes || []
      // nodes in query before re-layout
      const kpiQueryNodes = filterKpiNodes<ReactFlowKPINodeOutputType>(queryNodes)
      // node after re-layout with new position
      const kpiNodes = nodes.filter<ReactFlowKPINode>(
        (node): node is ReactFlowKPINode => node.type === 'kpi' && node.data.id !== variables.id,
      )
      // get difference nodes by position
      const diff = getDifferenceNodesByPosition(kpiNodes, kpiQueryNodes)

      if (diff.length) {
        // TODO: handle error when update multiple nodes
        bulkUpdate.mutate(diff.map((n) => n.data))
      }
    },
  })

  return mutation
}

export { useNodeCreateMutation }
