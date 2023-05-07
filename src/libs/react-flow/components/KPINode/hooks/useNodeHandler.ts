import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { consola } from 'consola'
import { getSaveAction } from '../utils'
import { useNodeCreateMutation } from './useNodeCreateMutation'

const useNodeHandler = () => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const templateId = useRFStore((state) => state.templateId)
  const { mutate: create } = useNodeCreateMutation()

  const saveHandler = (data: KPINodeType) => {
    const action = getSaveAction(data)
    consola.info('[MUTATE ACTION]', action)

    switch (action) {
      case 'CREATE':
        consola.info('[MUTATE DATA]', data)
        create({ ...data, template_id: templateId })
        break
      case 'UPDATE':
        consola.info('[MUTATE DATA]', data)
        updateNode(data)
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
