import { HierarchyNode, hierarchy } from 'd3-hierarchy'
import { FlowNode, ReactFlowNode } from '../types'
import { generateNextNode } from './hierarchy'

export const generateNextReactFlowNode = (
  parentId: string,
  d3Root: HierarchyNode<FlowNode>,
): ReactFlowNode => {
  const parentNode =
    parentId === 'root'
      ? d3Root
      : (d3Root.find((node) => node.data.id === parentId) as HierarchyNode<FlowNode>)

  const nextFlowNode = generateNextNode(parentNode)
  d3Root.children?.push(hierarchy(nextFlowNode))

  return {
    id: nextFlowNode.id,
    data: nextFlowNode,
    position: { x: 0, y: 0 },
  }
}
