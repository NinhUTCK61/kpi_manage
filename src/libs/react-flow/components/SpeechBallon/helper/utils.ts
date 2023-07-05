import { KPINodeType, ReactFlowNode } from '@/libs/react-flow/types'
import { SpeechBallon } from '@prisma/client'
import { differenceWith, isEqual } from 'lodash'

type TypeDataPropContext = SpeechBallon | KPINodeType

export function isDataKPISpeechBallon(node: TypeDataPropContext): node is SpeechBallon {
  return (node as SpeechBallon)?.text !== undefined
}

export function getDifferenceNodesByData<T extends ReactFlowNode>(nodes: T[], compareNodes: T[]) {
  const comparator = (a: ReactFlowNode, b: ReactFlowNode) => {
    return a.id === b.id && isEqual(a.data, b.data)
  }

  if (nodes.length > compareNodes.length) {
    return differenceWith(nodes, compareNodes, comparator)
  }
  return differenceWith(compareNodes, nodes, comparator)
}
