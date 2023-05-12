import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { consola } from 'consola'
import { useNodeCreateMutation, useNodeDeleteMutation, useNodeUpdateMutation } from '.'
import { useKPINodeContext } from '../context'
import { getSaveAction } from '../utils'

export enum SaveReason {
  SubmitForm,
}

const useNodeHandler = () => {
  const templateId = useRFStore((state) => state.templateId)
  const setNodeFocus = useRFStore((state) => state.setNodeFocus)
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

  const saveHandler = (_newData: KPINodeType) => {
    const action = getSaveAction(_newData, data)
    const newData = handleData(_newData)

    consola.info('[MUTATE ACTION]', action) // keep it to debug
    switch (action) {
      case 'CREATE':
        create({ ...newData, template_id: templateId })
        break
      case 'UPDATE':
        update({ ...newData })
        setNodeFocus('')
        break
      case 'DELETE':
        deleteMutate({ id: newData.id })
        break
      case 'CANCEL':
        break
    }
  }

  return { saveHandler }
}

export { useNodeHandler }
