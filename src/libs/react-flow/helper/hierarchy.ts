import { nanoid } from 'nanoid'
import { DEFAULT_NODE_ATTRIBUTES } from '../constant'
import { HierarchyFlowNode, KPINodeType } from '../types'

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
  if (parentNode.data.data.slug === 'root') {
    let nextLetter = ''
    let index = parentNode.children?.length ?? 0
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children?.some((child) => child.data.data.slug === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = parentNode.children?.length ?? 0 + 1
    do {
      nextNumber = `${parentNode.data.data.slug}${index}`
      index++
    } while (parentNode.children?.some((child) => child.data.data.slug === nextNumber))
    return nextNumber
  }
}

export function generateNextIdByFill(parentNode: HierarchyFlowNode): string {
  if (parentNode.data.data.slug === 'root') {
    let nextLetter = ''
    let index = parentNode.children?.length ?? 0
    do {
      nextLetter = String.fromCharCode(65 + index)
      index++
    } while (parentNode.children?.some((child) => child.data.data.slug === nextLetter))
    return nextLetter
  } else {
    let nextNumber = ''
    let index = parentNode.children?.length ?? 0 + 1
    do {
      nextNumber = `${parentNode.data.data.slug}${index}`
      index++
    } while (parentNode.children?.some((child) => child.data.data.slug === nextNumber))
    return nextNumber
  }
}

export const generateNextId = generateNextIdByFill

export const generateNextNode = (parentNode: HierarchyFlowNode): KPINodeType => {
  return {
    id: nanoid(),
    slug: generateNextId(parentNode),
    parent_node_id: parentNode.data.id,
    ...DEFAULT_NODE_ATTRIBUTES,
  }
}
