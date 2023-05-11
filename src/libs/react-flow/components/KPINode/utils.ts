import { colorAlphabet } from '@/libs/config/theme'
import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { differenceWith, isEqual } from 'lodash'
import { KPINodeType, ReactFlowNode } from '../../types'

export enum SaveAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  UPDATE = 'UPDATE',
}

// New node create in client has no template_id
export const getSaveAction = (newData: KPINodeType, oldData: KPINodeType): SaveAction => {
  if (isEqual(newData, oldData)) {
    return SaveAction.CANCEL
  }

  const { template_id, input_title } = newData
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

export function generateColors(text: string) {
  if (!colorAlphabet[text as keyof typeof colorAlphabet]) {
    const base_char = text.charCodeAt(0).toString().split('').reverse().join('')
    const gColor = text.charCodeAt(0) % 10
    const bColor = 10 - gColor

    return text.charCodeAt(0) % 2 === 0
      ? `#${base_char}${gColor}${gColor}${bColor}${bColor}`
      : `#${bColor}${bColor}${gColor}${gColor}${base_char}`
  }

  return colorAlphabet[text as keyof typeof colorAlphabet]
}
