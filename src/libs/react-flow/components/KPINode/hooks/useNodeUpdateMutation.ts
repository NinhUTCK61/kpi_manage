import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeUpdateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const mutation = api.node.update.useMutation({
    async onMutate(variables) {
      updateNode(variables)

      const prevData = utils.node.list.getData({ template_id: variables.template_id })

      utils.node.list.setData({ template_id: variables.template_id }, (old) => {
        if (!old) return old
        const { nodes: _nodes = [], edges } = old
        return {
          nodes: _nodes.map((node) =>
            variables.id === node.data.id ? { ...node, ...variables } : node,
          ),
          edges,
        }
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

export { useNodeUpdateMutation }
