import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { differenceWith } from 'lodash'
import { Node as RFNode } from 'reactflow'
import { NodeFormProps } from '../components'
import { KPINodeType, ReactFlowKPINode, ReactFlowNode } from '../types'

export function isEmptyKPINodeForm(node: KPINodeType | NodeFormProps) {
  return !node.input_title && !node.input_value && !node.unit
}

export function isReactFlowKPINode(node: RFNode): node is ReactFlowKPINode {
  return node.type === 'kpi'
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