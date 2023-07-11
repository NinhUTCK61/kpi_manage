import { calculatorValue2number, getDiffValue2Number } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { consola } from 'consola'
import { produce } from 'immer'
import { enqueueSnackbar } from 'notistack'
import {
  useFormularHanlder,
  useNodeCreateMutation,
  useNodeDeleteMutation,
  useNodeUpdateMutation,
} from '.'
import { useKPINodeContext } from '../context'
import { getSaveAction } from '../utils'

export enum SaveReason {
  SubmitForm,
}

const useNodeHandler = () => {
  const templateId = useRFStore((state) => state.templateId)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const nodeCopy = useRFStore((state) => state.nodeCopy)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const updateKPINode = useRFStore((state) => state.updateKPINode)
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const { mutate: create } = useNodeCreateMutation()
  const { update, bulkUpdate } = useNodeUpdateMutation()
  const { handleDelete: deleteMutate } = useNodeDeleteMutation()
  const { nodeInputValidate } = useFormularHanlder()
  const { data, form } = useKPINodeContext()

  const handleData = (data: KPINodeType) => {
    // TODO: write function handle node data
    const input_value = data.input_value || ''
    const is_formula = input_value.includes('=')
    const nodes = getKpiNodes()
    if (!is_formula) {
      //format '123,123.123' to '123123.123'
      data.value2number = Number(parseFloat(input_value.replace(/,/g, ''))) || null
    } else {
      // TODO: handler calculate formula here
      const { value2Number, error } = calculatorValue2number(input_value, nodes)

      if (error) {
        data.value2number = null
        form &&
          form.setError('input_value', {
            message: 'invalid_formula',
          })
        return
      }

      data.value2number = value2Number
    }
    data.is_formula = is_formula
    data.input_title = data.input_title.trim()
    data.unit = data.unit?.trim() as string

    return data
  }

  const saveHandler = (_newData: KPINodeType) => {
    const action = getSaveAction(_newData, data)
    const newData = handleData(_newData)
    if (!newData) return
    consola.info('[MUTATE ACTION]', action) // keep it to debug
    switch (action) {
      case 'CREATE':
        create({ ...newData, template_id: templateId })
        break
      case 'UPDATE':
        if (isBulkUpdate(newData)) {
          const bulkUpdateData = getBulkUpdateData(newData)
          if (!bulkUpdateData) return
          const _bulkUpdateData = [...bulkUpdateData.map((e) => e.data)]
          // nếu chưa có node trong bulkUpdateData thì thêm vào (Ví dụ: trường hợp tạo mới hoặc thêm input_value mới )
          const nodeUpdate = _bulkUpdateData.find((e) => e.id === newData.id)
          if (!nodeUpdate) {
            _bulkUpdateData.unshift({ ...newData })
          }
          bulkUpdate.mutate(_bulkUpdateData)
          return
        }
        update.mutate({ ...newData })
        setNodeFocused(null)
        break
      case 'DELETE':
        deleteMutate(newData.id)
        break
      case 'CANCEL':
        break
    }
  }

  const handlePaste = () => {
    if (!nodeCopy || (nodeCopy && nodeCopy.type !== 'kpi')) return
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return
    const nodes = getKpiNodes()
    const inputValue = nodeCopy.data.input_value || ''
    if (inputValue.startsWith('=')) {
      const errorMessage = nodeInputValidate(inputValue, nodes, nodeFocused)
      if (errorMessage) {
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        })
        return
      }
    }

    form.setValue('input_title', nodeCopy.data.input_title)
    form.setValue('input_value', nodeCopy.data.input_value)
    form.setValue('unit', nodeCopy.data.unit)

    updateKPINode({
      id: data.id,
      node_style: nodeCopy.data.node_style,
    })
  }

  const isBulkUpdate = (newData: KPINodeType) => {
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return false
    return nodeFocused.data.value2number !== newData.value2number
  }

  const getBulkUpdateData = (newData: KPINodeType) => {
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return
    const nodes = getKpiNodes()
    const newNodes = produce(nodes, (draft) => {
      const newNode = draft.find((e) => e.id === nodeFocused?.id)
      if (newNode) newNode.data = newData
    })
    return getDiffValue2Number(nodeFocused, newNodes)
  }

  return { saveHandler, handlePaste }
}

export { useNodeHandler }
