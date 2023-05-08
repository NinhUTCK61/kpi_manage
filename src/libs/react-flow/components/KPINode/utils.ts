import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { differenceWith } from 'lodash'
import { KPINodeType, ReactFlowNode } from '../../types'

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

export function getDifferenceNodesByPosition<T extends ReactFlowNode>(nodes: T[], queryNodes: T[]) {
  const diff = differenceWith(nodes, queryNodes, (a, b) => {
    return a.id === b.id && a.position.x === b.position.x && a.position.y === b.position.y
  })

  return diff
}

export function filterKpiNodes<
  V extends T,
  T extends ReactFlowNode | ReactFlowNodeOutputType = ReactFlowNode | ReactFlowNodeOutputType,
>(nodes: T[]) {
  return nodes.filter<V>((node): node is V => node.type === 'kpi')
}
