import { useRFStore } from '@/libs/react-flow/hooks'
import { KPINodeType } from '@/libs/react-flow/types'
import { getSaveAction } from '../utils'
import { useNodeCreateMutation } from './useNodeCreateMutation'
import { useNodeUpdateMutation } from './useNodeUpdateMutation'

const useNodeHandler = () => {
  const templateId = useRFStore((state) => state.templateId)
  const { mutate: create } = useNodeCreateMutation()
  const { mutate: update } = useNodeUpdateMutation()

  const saveHandler = (data: KPINodeType) => {
    const action = getSaveAction(data)

    switch (action) {
      case 'CREATE':
        create({ ...data, template_id: templateId })
        break
      case 'UPDATE':
        update({ ...data })
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
