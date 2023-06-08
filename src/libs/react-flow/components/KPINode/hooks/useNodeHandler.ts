import { calculatorValue2number, getDiffValue2Number } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType, ReactFlowKPINode } from '@/libs/react-flow/types'
import { consola } from 'consola'
import { produce } from 'immer'
import { useCallback } from 'react'
import { useNodeCreateMutation, useNodeDeleteMutation, useNodeUpdateMutation } from '.'
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
  const {
    mutation: { mutate: mutateUpdate },
    mutationBulk: { mutate: mutateBulkUpdate },
  } = useNodeUpdateMutation()
  const { mutate: deleteMutate } = useNodeDeleteMutation()

  const { data } = useKPINodeContext()

  const handleData = (data: KPINodeType) => {
    // TODO: write function handle node data
    const input_value = data.input_value || ''
    const is_formula = input_value.includes('=')
    const nodes = getKpiNodes()
    if (!is_formula) {
      data.value2number = Number(input_value) || null
    } else {
      // TODO: handler calculate formula here
      data.value2number = calculatorValue2number(
        input_value,
        nodes.filter((e) => e.type === 'kpi') as ReactFlowKPINode[],
      )
    }
    data.is_formula = is_formula

    return data
  }

  const isBulkUpdate = (newData: KPINodeType) => {
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return false
    return nodeFocused.data.value2number !== newData.value2number
  }

  const getBuldUpdateData = (newData: KPINodeType) => {
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return
    const nodes = getKpiNodes().filter((e) => e.type === 'kpi')
    const newNodes = produce(nodes, (draft) => {
      const newNode = draft.find((e) => e.id === nodeFocused?.id)
      if (newNode) newNode.data = newData
    })
    return getDiffValue2Number(nodeFocused, newNodes)
  }

  const saveHandler = (_newData: KPINodeType) => {
    const action = getSaveAction(_newData, data)
    const newData = handleData(_newData)
    consola.info('[MUTATE ACTION]', action) // keep it to debug
    switch (action) {
      case 'CREATE':
        create({ ...newData, template_id: templateId })
        break
      case 'UPDATE':
        setNodeFocused(null)
        if (isBulkUpdate(newData)) {
          const bulkUpdateData = getBuldUpdateData(newData)
          if (!bulkUpdateData) return
          console.log(bulkUpdateData)
          const _bulkUpdateData = [...bulkUpdateData.map((e) => e.data), { ...newData }]
          mutateBulkUpdate(_bulkUpdateData)
          return
        }
        mutateUpdate({ ...newData })
        break
      case 'DELETE':
        deleteMutate({ id: newData.id })
        break
      case 'CANCEL':
        break
    }
  }

  const handlePaste = useCallback(() => {
    if (!nodeCopy) return
    if (nodeCopy.type !== 'kpi') return

    updateKPINode({
      id: data.id,
      input_title: nodeCopy.data.input_title,
      input_value: nodeCopy.data.input_value,
      unit: nodeCopy.data.unit,
      node_style: nodeCopy.data.node_style,
    })
  }, [data.id, nodeCopy, updateKPINode])

  return { saveHandler, handlePaste }
}

export { useNodeHandler }
