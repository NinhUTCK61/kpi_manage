import { api } from '@/libs/api'
import { getDifferenceNodesByPosition, useNodeUpdateMutation } from '@/libs/react-flow'
import { getNodeIncludeSlug } from '@/libs/react-flow/helper/expression'
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
import { filterKpiNodes } from '../utils'

const useNodeDeleteMutation = () => {
  const removeNode = useRFStore((state) => state.removeNode)
  const templateId = useRFStore((state) => state.templateId)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const handleToggleDialogDelete = useRFStore((state) => state.handleToggleDialogDelete)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const { bulkUpdate } = useNodeUpdateMutation()

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

      setNodeFocused(null)

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
          bulkUpdate.mutate(diff.map((n) => n.data))
        }
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  const handleDelete = (id: string) => {
    const node = utils.node.list
      .getData({ template_id: templateId })
      ?.nodes.find((n) => n.id === id)
    if (!node || node.type !== 'kpi') return
    const nodes = getKpiNodes()
    const slugs = getNodeIncludeSlug(node, nodes)
    if (slugs.length) {
      handleToggleDialogDelete({
        open: true,
        node: node.data.slug,
        nodeRelated: slugs,
      })
      return
    }
    mutation.mutate({ id })
  }

  return { handleDelete, ...mutation }
}

export { useNodeDeleteMutation }
