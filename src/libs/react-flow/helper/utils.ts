import { Node as RFNode } from 'reactflow'
import { NodeFormProps } from '../components'
import { KPINodeType, ReactFlowKPINode } from '../types'

export function isEmptyKPINodeForm(node: KPINodeType | NodeFormProps) {
  return !node.input_title && !node.input_value && !node.unit
}

export function isReactFlowKPINode(node: RFNode): node is ReactFlowKPINode {
  return node.type === 'kpi'
}
