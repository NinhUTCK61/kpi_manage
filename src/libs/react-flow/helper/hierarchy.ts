import { HierarchyNode } from 'd3-hierarchy'
import { Edge as ReactFlowEdge } from 'reactflow'
import { DEFAULT_NODE_ATTRIBUTES } from '../constant'
import { HierarchyFlowNode, KPINodeType, ReactFlowNode } from '../types'

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

export const generateNextNode = (parentNode: HierarchyFlowNode): KPINodeType => {
  return {
    id: generateNextId(parentNode),
    slug: generateNextId(parentNode),
    parent_node_id: parentNode.data.id,
    ...DEFAULT_NODE_ATTRIBUTES,
  }
}

// Convert d3-hierarchy nodes to reactflow nodes
export const convertToReactFlowNodes = (
  hierarchyNode: HierarchyNode<KPINodeType>,
): ReactFlowNode[] => {
  const descendants = hierarchyNode.descendants()

  return descendants.map((node) => {
    return {
      id: node.data.id,
      data: {
        parent_node_id: node.data.parent_node_id,
        id: node.data.id,
        slug: node.data.slug,
        x: node.data.x,
        y: node.data.y,
        input_title: node.data.input_title,
        input_value: node.data.input_value,
        value2number: node.data.value2number,
        style: node.data.style,
        is_formula: node.data.is_formula,
        unit: node.data.unit,
        template_id: node.data.template_id,
        type: 'kpi',
      },
      position: { x: node.data.x, y: node.data.y },
      type: 'kpi',
    }
  })
}

// Convert d3-hierarchy links to reactflow edges
export const convertToReactFlowEdges = (
  hierarchyNode: HierarchyNode<KPINodeType>,
): ReactFlowEdge[] => {
  const links = hierarchyNode.links()

  return links.map((link) => {
    return {
      id: `${link.source.data.slug}-${link.target.data.slug}`,
      source: link.source.data.id,
      target: link.target.data.id,
      animated: true,
    }
  })
}
