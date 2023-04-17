import { HierarchyNode } from 'd3-hierarchy'
import { Edge as ReactFlowEdge, Node as ReactFlowNode } from 'reactflow'
import { FlowNode, HierarchyFlowNode } from '../types'

export function generateIds(d3Node: HierarchyFlowNode): void {
  d3Node.each((node) => {
    if (!node.children) {
      return
    }

    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i] as HierarchyFlowNode
      childNode.data.id = generateNextIdByFill(node)
    }
  })
}

export function generateNextIdByAdd(parentNode: HierarchyFlowNode): string {
  if (parentNode.data.id === 'root') {
    let nextLetter = ''
    let index = parentNode.children?.length ?? 0
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children?.some((child) => child.id === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = parentNode.children?.length ?? 0 + 1
    do {
      nextNumber = `${parentNode.id}${index}`
      index++
    } while (parentNode.children?.some((child) => child.id === nextNumber))
    return nextNumber
  }
}

export function generateNextIdByFill(parentNode: HierarchyFlowNode): string {
  if (parentNode.data.id === 'root') {
    let nextLetter = ''
    let index = parentNode.children?.length ?? 0
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children?.some((child) => child.data.id === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = parentNode.children?.length ?? 0 + 1
    do {
      nextNumber = `${parentNode.data.id}${index}`
      index++
    } while (parentNode.children?.some((child) => child.data.id === nextNumber))
    return nextNumber
  }
}

export const generateNextId = generateNextIdByFill

export const generateNextNode = (parentNode: HierarchyFlowNode): FlowNode => {
  return {
    id: generateNextId(parentNode),
    slug: generateNextId(parentNode),
    parent_node_id: parentNode.data.id,
    x: 0,
    y: 0,
  }
}

// Convert d3-hierarchy nodes to reactflow nodes
export const convertToReactFlowNodes = (
  hierarchyNode: HierarchyNode<FlowNode>,
): ReactFlowNode[] => {
  const descendants = hierarchyNode.descendants()

  return descendants.map((node) => {
    return {
      id: node.data.id,
      data: { id: node.data.id },
      // position: { x: node.data.x, y: node.data.y },
      position: { x: 0, y: 0 },
    }
  })
}

// Convert d3-hierarchy links to reactflow edges
export const convertToReactFlowEdges = (
  hierarchyNode: HierarchyNode<FlowNode>,
): ReactFlowEdge[] => {
  const links = hierarchyNode.links()

  return links.map((link, index) => {
    return {
      id: `edge-${link.source.data.id}-${link.target.data.id}-${index}`,
      source: link.source.data.id,
      target: link.target.data.id,
      animated: true,
    }
  })
}
