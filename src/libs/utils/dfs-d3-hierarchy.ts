import { HierarchyNode, hierarchy } from 'd3-hierarchy'

export interface NodeFlow {
  id: string
  children: NodeFlow[]
}

export function createD3Hierarchy(data: NodeFlow): HierarchyNode<NodeFlow> {
  return hierarchy<NodeFlow>(data, (node) => node.children)
}

export function generateIds(d3Node: HierarchyNode<NodeFlow>): void {
  d3Node.each((node) => {
    if (!node.children) {
      return
    }

    for (let i = 0; i < node.children.length; i++) {
      const childNode = node.children[i] as HierarchyNode<NodeFlow>
      childNode.data.id = generateNextIdByFill(node)
    }
  })
}

export function generateNextIdByAdd(parentNode: HierarchyNode<NodeFlow>): string {
  if (parentNode.id === 'root') {
    let nextLetter = ''
    let index = parentNode.data.children.length ?? 0
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

export function generateNextIdByFill(parentNode: HierarchyNode<NodeFlow>): string {
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
