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
  const { data, children } = parentNode
  const { slug } = data.data
  const existingSlugs = new Set(children?.map((child) => child.data.data.slug))

  if (slug === 'root') {
    let index = children?.length ?? 0
    while (existingSlugs.has(String.fromCharCode(65 + index))) {
      index++
    }
    return String.fromCharCode(65 + index)
  } else {
    let index = children?.length ?? 0 + 1
    let nextSlug = `${slug}${index}`
    while (existingSlugs.has(nextSlug)) {
      index++
      nextSlug = `${slug}${index}`
    }
    return nextSlug
  }
}

export function generateNextIdByFill(parentNode: HierarchyFlowNode): string {
  const { data, children } = parentNode
  const { slug } = data.data
  const existingSlugs = new Set(children?.map((child) => child.data.data.slug))

  if (slug === 'root') {
    let index = children?.length ?? 0
    while (existingSlugs.has(String.fromCharCode(65 + index))) {
      index++
    }
    return String.fromCharCode(65 + index)
  } else {
    let index = (children?.length ?? 0) + 1
    let nextSlug = `${slug}${index}`
    while (existingSlugs.has(nextSlug)) {
      index++
      nextSlug = `${slug}${index}`
    }
    return nextSlug
  }
}

export const generateNextId = generateNextIdByFill

export const generateNextNode = (parentNode: HierarchyFlowNode): KPINodeType => {
  return {
    id: nanoid(),
    slug: generateNextId(parentNode),
    parent_node_id: parentNode.data.id,
    is_saved: false,
    ...DEFAULT_NODE_ATTRIBUTES,
  }
}
