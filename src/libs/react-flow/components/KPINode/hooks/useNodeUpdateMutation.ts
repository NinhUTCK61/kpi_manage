import { api } from '@/libs/api'
import { getDiffValue2Number } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeUpdateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const templateId = useRFStore((state) => state.templateId)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const updateBulkKpiNode = useRFStore((state) => state.updateBulkKpiNode)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.node.update.useMutation({
    async onMutate(variables) {
      updateNode(variables, !!nodeFocused)

      const prevData = utils.node.list.getData({ template_id: templateId })
      const prevDataNode = prevData?.nodes.find((node) => node.data.id === variables.id)
      utils.node.list.setData({ template_id: templateId }, (old) => {
        if (!old) return old
        const { nodes: _nodes = [], edges } = old
        return {
          nodes: _nodes.map((node) =>
            variables.id === node.data.id ? { ...node, ...variables } : node,
          ),
          edges,
        }
      })

      return { prevData, templateId, prevDataNode }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.internal_server_error'), {
        variant: 'error',
      })
      // TODO: update lại node trong store

      utils.node.list.setData({ template_id: ctx?.templateId as string }, ctx?.prevData)
    },
    onSuccess(data, _, ctx) {
      if (ctx?.prevDataNode?.type !== 'kpi') return
      const prevData = ctx?.prevData?.nodes
      const prevDataNode = ctx?.prevDataNode
      const listKpiNode = prevData?.filter(
        (node) => node.type === 'kpi' && node.data.input_value,
      ) as ReactFlowKPINode[]
      //if value2number change, update another node has nodeFocused slug in formula
      if (prevDataNode?.data.value2number !== data.value2number) {
        const listDiffValue2Number = getDiffValue2Number(
          prevDataNode,
          listKpiNode.map((n) =>
            n.id === prevDataNode?.id
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    value2number: data.value2number,
                  },
                }
              : n,
          ),
        )
        if (listDiffValue2Number.length) {
          // TODO: handle error when update multiple nodes
          mutationBulk.mutate(listDiffValue2Number.map((n) => n.data))
        }
      }
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  const mutationBulk = api.node.bulkUpdate.useMutation({
    onSuccess(data) {
      updateBulkKpiNode(data)
    },
    onError() {
      enqueueSnackbar(t('error.internal_server_error'), {
        variant: 'error',
      })
    },
  })

  return mutation
}

export { useNodeUpdateMutation }
