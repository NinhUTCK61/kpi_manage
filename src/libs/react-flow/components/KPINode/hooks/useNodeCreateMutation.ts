import { api } from '@/libs/api'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { differenceWith, isEqual } from 'lodash'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'

const useNodeCreateMutation = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const removeNode = useRFStore((state) => state.removeNode)
  const nodes = useRFStore((state) => state.nodes)
  const utils = api.useContext()
  const { t } = useTranslation('common')

  const { mutate: mulUpdate } = api.node.multipleUpdate.useMutation()

  const mutation = api.node.create.useMutation({
    async onMutate(variables) {
      updateNode({ ...variables, type: 'kpi' })
    },
    onError(_, variables) {
      enqueueSnackbar(t('error.create_node'), {
        variant: 'error',
      })

      removeNode(variables.id)
    },
    onSuccess(_, variables) {
      // TODO: update node position after re-layout
      const nodesQuery =
        utils.node.list
          .getData({ template_id: variables.template_id })
          ?.nodes.filter((node) => node.data.type === 'kpi') || []
      const kpiNodes = nodes.filter((node) => node.data.type === 'kpi')
      // Get difference node position
      const diff = differenceWith(kpiNodes, nodesQuery, (a, b) => isEqual(a.position, b.position))

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
