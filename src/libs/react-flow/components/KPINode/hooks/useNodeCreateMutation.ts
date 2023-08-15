import { api } from '@/libs/api'
import { getDifferenceNodesByPosition, useNodeUpdateMutation } from '@/libs/react-flow'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store'
import { ReactFlowKPINodeOutputType } from '@/libs/schema/node'
import { produce } from 'immer'
import { useTranslation } from 'next-i18next'
import { enqueueSnackbar } from 'notistack'
import { getDiffValue2Number, getSlugFromInputValue } from '../../../helper/expression'
import { filterKpiNodes } from '../utils'

const useNodeCreateMutation = (reason?: UpdateStateReason) => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const removeKPINode = useRFStore((state) => state.removeKPINode)
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const utils = api.useContext()
  const { t } = useTranslation('common')
  const { bulkUpdate } = useNodeUpdateMutation(reason ?? UpdateStateReason.BulkUpdateNodeInternal)

  const mutation = api.node.create.useMutation({
    async onMutate(variables) {
      updateNode({ ...variables, is_saved: true }, true, reason ?? UpdateStateReason.AddKPINode)
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
      const kpiNodes = getKpiNodes()
      const _kpiNodes = kpiNodes.filter((node) => node.id !== variables.id)
      // get difference nodes by position
      const diff = getDifferenceNodesByPosition(_kpiNodes, kpiQueryNodes)

      if (diff.length) {
        // TODO: handle error when update multiple nodes
        bulkUpdate.mutate(diff.map((n) => n.data))
      }
      // kiếm tra node tạo mới này có từng nhập ở đâu không
      const nodesIncludeNewNode = kpiNodes.find(
        (node) =>
          node.data.is_formula &&
          getSlugFromInputValue(node.data.input_value as string).includes(variables.slug),
      )

      if (nodesIncludeNewNode) {
        // gán giá trị mới nhất
        const newNodes = produce(kpiNodes, (draft) => {
          const newNode = draft.find((e) => e.id === variables.id)
          if (newNode) newNode.data = { ...variables, is_saved: true }
        })
        // cập nhật các node đang bị lỗi nếu như node này đã từng được xóa
        const bulkData = getDiffValue2Number(variables.slug, newNodes)
        if (bulkData.length) {
          bulkUpdate.mutate(bulkData.map((n) => n.data))
        }
      }
    },
  })

  return mutation
}

export { useNodeCreateMutation }
