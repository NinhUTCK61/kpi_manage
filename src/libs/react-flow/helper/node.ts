import { HierarchyNode, hierarchy, tree } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import {
  HORIZONTAL_SPACING_FACTOR,
  NODE_HEIGHT,
  NODE_WIDTH,
  VERTICAL_SPACING_FACTOR,
} from '../constant'
import { HierarchyFlowNode, ReactFlowKPINode, ReactFlowNode } from '../types'
import { generateNextNode } from './hierarchy'

export const generateNextReactFlowNode = (
  parentId: string,
  d3Root: HierarchyFlowNode,
): { node: ReactFlowKPINode; edge: Edge } => {
  const parentNode =
    parentId === 'root'
      ? d3Root
      : (d3Root.find((node) => node.data.id === parentId) as HierarchyFlowNode)

  const nextFlowNode = generateNextNode(parentNode)

  const node: ReactFlowKPINode = {
    id: nextFlowNode.id,
    data: nextFlowNode,
    position: { x: 0, y: 0 },
    type: 'kpi',
    draggable: false,
    selected: true,
  }

  parentNode.children = [...(parentNode.children ?? []), hierarchy(node)]

  const edge: Edge = {
    id: `${parentNode.data.data.slug}-${nextFlowNode.slug}`,
    source: parentId,
    target: nextFlowNode.id,
    type: 'kpi',
  }

  return { node, edge }
}

function calculateSubtreeChild<T>(node: HierarchyNode<T>): number {
  let sumChild = 0
  node.each((n) => {
    if (n.children?.length) {
      sumChild += n.children.length > 1 ? n.children.length : 0
    }
  })
  return sumChild
}

export function getTreeLayout<T>(d3Root: HierarchyNode<T>) {
  return tree<T>()
    .nodeSize([
      NODE_HEIGHT * (1.5 + VERTICAL_SPACING_FACTOR),
      NODE_WIDTH * (1 + HORIZONTAL_SPACING_FACTOR),
    ]) // default vertical spacing: 1.5 - 1 = 0.5 (* NODE_HEIGHT), horizontal = NODE_WIDTH * (1.5 - 1)
    .separation((a, b) => {
      const aTotalChild = calculateSubtreeChild(a)
      const bTotalChild = calculateSubtreeChild(b)

      const distanceFactor = Math.max(aTotalChild, bTotalChild) / 2

      if (distanceFactor <= 1) {
        return 1
      }

      return a.parent === b.parent ? distanceFactor : distanceFactor + 0.5
    })(d3Root)
}

export function getLayoutElements(d3Root: HierarchyFlowNode) {
  const tree = getTreeLayout(d3Root)
  const newNodes: ReactFlowNode[] = []

  tree.each((node) => {
    console.log('node', node)
    node.data.position = {
      x: node.y,
      y: node.x,
    }

    newNodes.push(node.data)
  })

  return newNodes
}
