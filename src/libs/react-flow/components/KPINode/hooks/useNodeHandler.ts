import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { consola } from 'consola'
import { useNodeCreateMutation, useNodeUpdateMutation } from '.'
import { useKPINodeContext } from '../context'
import { getSaveAction } from '../utils'

const useNodeHandler = () => {
  const templateId = useRFStore((state) => state.templateId)
  const { mutate: create } = useNodeCreateMutation()
  const { mutate: update } = useNodeUpdateMutation()

  const { data } = useKPINodeContext()

  const saveHandler = (newData: KPINodeType) => {
    const action = getSaveAction(newData, data)
    consola.info('[MUTATE ACTION]', action) // keep it to debug

    switch (action) {
      case 'CREATE':
        create({ ...newData, template_id: templateId })
        break
      case 'UPDATE':
        update({ ...newData })
        break
      case 'DELETE':
        break
      case 'CANCEL':
        break
    }
  }

  return { saveHandler }
}

export { useNodeHandler }
