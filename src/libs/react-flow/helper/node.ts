import { hierarchy } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import { HierarchyFlowNode, ReactFlowNode } from '../types'
import { generateNextNode } from './hierarchy'

export const generateNextReactFlowNode = (
  parentId: string,
  d3Root: HierarchyFlowNode,
): { node: ReactFlowNode; edge: Edge } => {
  const parentNode =
    parentId === 'root'
      ? d3Root
      : (d3Root.find((node) => node.data.id === parentId) as HierarchyFlowNode)

  const nextFlowNode = generateNextNode(parentNode)

  const node: ReactFlowNode = {
    id: nextFlowNode.id,
    data: nextFlowNode,
    position: { x: 350, y: 75 },
    type: 'kpi',
  }

  parentNode.children = [...(parentNode.children ?? []), hierarchy(node)]

  const edge: Edge = {
    id: `${parentId}-${nextFlowNode.id}`,
    source: parentId,
    target: nextFlowNode.id,
  }

  return { node, edge }
}
