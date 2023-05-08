import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { ReactFlowSchema } from '@/libs/schema/node'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { z } from 'zod'

const useNodeUpdateColorMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.node.update.useMutation({
    async onMutate(variables) {
      updateNode({ ...(variables as KPINodeType) })

      const prevData = utils.node.list.getData({ template_id: variables.template_id })

      utils.node.list.setData({ template_id: variables.template_id }, (old) => {
        return {
          nodes: old?.nodes.map((node) =>
            variables.id === node.data.id ? { ...node, ...variables } : node,
          ),
          edges: old?.edges,
        } as unknown as z.infer<typeof ReactFlowSchema>
      })

      const templateId = variables.template_id

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

export { useNodeUpdateColorMutation }
