import { nanoid } from 'nanoid'
import { nextSlug } from '../components/KPINode/utils'
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

export function generateNextIdByAdd(
  parentNode: HierarchyFlowNode,
  d3Root: HierarchyFlowNode,
): string {
  const { data, children } = parentNode
  const parentSlug = data.data.slug

  if (parentSlug === 'root') {
    if (!children || children.length === 0) {
      return 'A'
    } else {
      const maxChildSlug = getMaxChildSlug(children)
      const maxChildNumber = lettersToNumber(maxChildSlug)
      return numberToLetters(maxChildNumber + 1)
    }
  } else {
    if (children?.length) {
      const maxCurrentSlug = children[children.length - 1]?.data.data.slug as string
      const newSlug = nextSlug(maxCurrentSlug)

      return generateNewSlug(newSlug, d3Root)
    }

    return generateNewSlug(parentSlug + 1, d3Root)
  }
}

function getMaxChildSlug(children: HierarchyFlowNode[]): string {
  return children.reduce((max, child) => {
    return lettersToNumber(child.data.data.slug) > lettersToNumber(max) ? child.data.data.slug : max
  }, 'A')
}

function lettersToNumber(letters: string | undefined): number {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = 0

  if (!letters) {
    return number
  }

  for (let i = 0; i < letters.length; i++) {
    const letterIndex = alphabet.indexOf(letters[i] as string)
    if (letterIndex !== -1) {
      number = number * 26 + (letterIndex + 1)
    }
  }

  return number
}

function numberToLetters(number: number): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let letters = ''

  while (number > 0) {
    const remainder = (number - 1) % 26
    letters = alphabet[remainder] + letters
    number = Math.floor((number - 1) / 26)
  }

  return letters
}

export function _generateNextIdByFill(parentNode: HierarchyFlowNode): string {
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

export function generateNextIdByFill(parentNode: HierarchyFlowNode): string {
  const { data, children } = parentNode
  const { slug } = data.data
  const existingSlugs = new Set(children?.map((child) => child.data.data.slug))

  if (slug === 'root') {
    let index = children?.length ?? 0
    while (existingSlugs.has(indexToSlug(index))) {
      index++
    }
    return indexToSlug(index)
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

// Function to convert index to slug
function indexToSlug(index: number): string {
  let str = ''
  do {
    const remainder = index % 26
    str = String.fromCharCode(65 + remainder) + str
    index = Math.floor(index / 26) - 1
  } while (index >= 0)
  return str
}

export const generateNextId = generateNextIdByAdd

export const generateNextNode = (
  parentNode: HierarchyFlowNode,
  d3Root: HierarchyFlowNode,
): KPINodeType => {
  return {
    id: nanoid(),
    slug: generateNextId(parentNode, d3Root),
    parent_node_id: parentNode.data.id,
    is_saved: false,
    ...DEFAULT_NODE_ATTRIBUTES,
  }
}

const generateNewSlug = (slug: string, d3Root: HierarchyFlowNode) => {
  let pass = false
  let _slug = slug
  //Tăng slug+1 đến khi hợp lệ
  while (!pass) {
    const node = d3Root.find((node) => node.data.data.slug === _slug)
    if (node) {
      _slug = nextSlug(_slug)
    } else {
      pass = true
    }
  }

  return _slug
}
