import { hierarchy, tree } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import { NODE_HEIGHT, NODE_WIDTH } from '../constant'
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
    position: { x: 0, y: 0 },
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

function calculateSubtreeChild(node: HierarchyFlowNode): number {
  let sumChild = 0
  node.each((n) => {
    if (n.children?.length) {
      sumChild += n.children.length > 1 ? n.children.length : 0
    }
  })
  return sumChild
}

export const getLayoutElements = (d3Root: HierarchyFlowNode) => {
  const treeData = tree<ReactFlowNode>()
    .nodeSize([NODE_HEIGHT * 1.5, NODE_WIDTH * 1.5]) // vertical spacing: 40*(1.5 - 1) = 20, horizontal = 80*(1.5 - 1) = 40
    .separation((a, b) => {
      const aTotalChild = calculateSubtreeChild(a)
      const bTotalChild = calculateSubtreeChild(b)

      const distanceFactor = Math.max(aTotalChild, bTotalChild) / 2

      if (distanceFactor <= 1) {
        return 1
      }

      return a.parent === b.parent ? distanceFactor : distanceFactor * 2
    })(d3Root)

  const newNodes: ReactFlowNode[] = []

  treeData.each((node) => {
    node.data.position = {
      x: node.y,
      y: node.x,
    }

    newNodes.push(node.data)
  })

  return newNodes
}
