import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ReactFlowNodeOutputType, ReactFlowOutputEdge } from '@/libs/schema/node'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeDeleteMutation = () => {
  const removeNode = useRFStore((state) => state.removeNode)
  const templateId = useRFStore((state) => state.templateId)
  const utils = api.useContext()
  const { t } = useTranslation('common')

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

      return { prevData, templateId }
    },
    onError(err, _, ctx) {
      enqueueSnackbar(t('error.internal_server_error'), {
        variant: 'error',
      })

      utils.node.list.setData({ template_id: ctx?.templateId as string }, ctx?.prevData)
    },
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  return mutation
}

export { useNodeDeleteMutation }
