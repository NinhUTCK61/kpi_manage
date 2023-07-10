import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeUpdateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const templateId = useRFStore((state) => state.templateId)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const bulkUpdateKpiNode = useRFStore((state) => state.bulkUpdateKpiNode)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const update = api.node.update.useMutation({
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
    onSettled() {
      utils.node.list.invalidate()
    },
  })

  const bulkUpdate = api.node.bulkUpdate.useMutation({
    onSuccess(data) {
      bulkUpdateKpiNode(data)
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

  return { update, bulkUpdate }
}

export { useNodeUpdateMutation }
