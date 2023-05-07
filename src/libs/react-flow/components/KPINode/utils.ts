import { KPINodeType } from '../../types'

export enum SaveAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  UPDATE = 'UPDATE',
}

// New node create in client has no template_id
export const getSaveAction = (data: KPINodeType): SaveAction => {
  const { template_id, input_title } = data
  if (!template_id && input_title) {
    return SaveAction.CREATE
  }

  if (!template_id && !input_title) {
    return SaveAction.CANCEL
  }

  return SaveAction.UPDATE
}
