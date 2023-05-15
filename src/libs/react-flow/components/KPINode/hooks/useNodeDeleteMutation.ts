import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import {
  ReactFlowKPINodeOutputType,
  ReactFlowNodeOutputType,
  ReactFlowOutputEdge,
} from '@/libs/schema/node'
import { intersectionBy } from 'lodash'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { filterKpiNodes, getDifferenceNodesByPosition } from '../utils'

const useNodeDeleteMutation = () => {
  const removeNode = useRFStore((state) => state.removeNode)
  const templateId = useRFStore((state) => state.templateId)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const { mutate: bulkUpdate } = api.node.bulkUpdate.useMutation()

  const mutation = api.node.delete.useMutation({
    async onMutate(variables) {
      const { nodes, edges } = removeNode(variables.id)
      const prevData = utils.node.list.getData({ template_id: templateId })

      utils.node.list.setData(
        { template_id: templateId },
        {
          nodes: nodes as ReactFlowNodeOutputType[],
          edges: edges as ReactFlowOutputEdge[],
        },
      )

      return { prevData, templateId, nodes, edges }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.internal_server_error'), {
        variant: 'error',
      })

      utils.node.list.setData({ template_id: ctx?.templateId as string }, ctx?.prevData)
    },
    onSuccess(_, __, ctx) {
      const newNodes = filterKpiNodes<ReactFlowKPINode>(ctx?.nodes || [])
      const oldAllNodes = ctx?.prevData?.nodes || []
      const oldNodeNeedUpdated = filterKpiNodes<ReactFlowKPINodeOutputType>(
        intersectionBy(oldAllNodes, newNodes, 'id'),
      )

      if (oldNodeNeedUpdated.length) {
        // get difference nodes by position
        const diff = getDifferenceNodesByPosition(newNodes, oldNodeNeedUpdated)

        if (diff.length) {
          bulkUpdate(diff.map((n) => n.data))
        }
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useNodeDeleteMutation }
