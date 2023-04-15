import { HierarchyNode, hierarchy } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import { FlowNode, ReactFlowNode } from '../types'
import { generateNextNode } from './hierarchy'

export const generateNextReactFlowNode = (
  parentId: string,
  d3Root: HierarchyNode<FlowNode>,
): { node: ReactFlowNode; edge: Edge } => {
  const parentNode =
    parentId === 'root'
      ? d3Root
      : (d3Root.find((node) => node.data.id === parentId) as HierarchyNode<FlowNode>)

  const nextFlowNode = generateNextNode(parentNode)
  parentNode.children = [...(parentNode.children ?? []), hierarchy(nextFlowNode)]

  const node: ReactFlowNode = {
    id: nextFlowNode.id,
    data: nextFlowNode,
    position: { x: 350, y: 75 },
    type: 'kpi',
  }

  const edge: Edge = {
    id: `${parentId}-${nextFlowNode.id}`,
    source: parentId,
    target: nextFlowNode.id,
  }

  return { node, edge }
}
