import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { consola } from 'consola'
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
  const { mutate: create } = useNodeCreateMutation()
  const { mutate: update } = useNodeUpdateMutation()
  const { mutate: deleteMutate } = useNodeDeleteMutation()

  const { data } = useKPINodeContext()

  const handleData = (data: KPINodeType) => {
    // TODO: write function handle node data
    const input_value = data.input_value || ''
    const is_formula = input_value.includes('=')

    if (!is_formula) {
      data.value2number = Number(input_value) || null
    } else {
      // TODO: handler calculate formula here
      data.value2number = null
    }
    data.is_formula = is_formula

    return data
  }

  const saveHandler = useCallback(
    (_newData: KPINodeType) => {
      const action = getSaveAction(_newData, data)
      const newData = handleData(_newData)

    consola.info('[MUTATE ACTION]', action) // keep it to debug
    switch (action) {
      case 'CREATE':
        create({ ...newData, template_id: templateId })
        break
      case 'UPDATE':
        setNodeFocused(null)
        update({ ...newData })
        break
      case 'DELETE':
        deleteMutate({ id: newData.id })
        break
      case 'CANCEL':
        break
    }
  },[create, data, deleteMutate, setNodeFocused, templateId, update])

  const handlePaste = useCallback(
    (_data: KPINodeType) => {
      if (!nodeCopy) return
      if (nodeCopy.type !== 'kpi') return

      const newData = handleData(_data)
      saveHandler({
        ...newData,
        input_title: nodeCopy.data.input_title,
        input_value: nodeCopy.data.input_value,
        unit: nodeCopy.data.unit,
        node_style: nodeCopy.data.node_style,
      })
    },
    [nodeCopy, saveHandler],
  )

  return { saveHandler, handlePaste }
}

export { useNodeHandler }
