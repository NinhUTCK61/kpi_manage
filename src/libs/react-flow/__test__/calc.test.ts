import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { describe, expect, test } from 'vitest'
import { DEFAULT_NODE_ATTRIBUTES } from '../constant'
import { getSlugFromInputValue } from '../helper/expression'

export const generateCalculatorStack = (nodes: ReactFlowKPINode[]) => {
  const valid = new Map<string, string[] | boolean>()
  const stack: string[] = []

  for (const {
    data: { slug, is_formula, input_value },
  } of nodes) {
    if (!is_formula) continue

    const expressionArr = getSlugFromInputValue(input_value as string)
    const expressionStack = [...expressionArr, slug]

    // Kiểm tra sự phụ thuộc giữa các toán hạng so với slug
    // Nếu tồn tại => lỗi
    // Nếu không tồn tại => thêm vào stack

    // validate
    for (const _slug of expressionArr) {
      const exists = valid.get(_slug)
      if (exists) {
        if (Array.isArray(exists) && exists.includes(slug)) {
          throw new Error(`Cyclic dependency detected: ${_slug} -> ${slug}`)
        }
      }
    }

    valid.set(slug, expressionArr)
    // validate expression
    if (!stack.length) {
      stack.push(...expressionStack)
      continue
    }

    for (const _slug of expressionArr) {
      if (!stack.includes(_slug)) {
        stack.unshift(_slug)
        valid.set(_slug, true)
      }
    }

    let maxIndex = 0
    for (const _slug of expressionArr) {
      const indexSlug = stack.indexOf(_slug)
      if (indexSlug > maxIndex) {
        maxIndex = indexSlug
      }
    }

    console.log(111, maxIndex, expressionArr, slug, stack)

    // check if slug exists in stack to validate and move to the right position of maxIndex
    // else add after maxIndex

    const indexSlug = stack.indexOf(slug)
    if (indexSlug !== -1) {
      stack.splice(indexSlug, 1)
    }

    stack.splice(maxIndex + 1, 0, slug)
  }

  return stack
}

const nodes: ReactFlowKPINode[] = [
  {
    id: 'A',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      slug: 'A',
      is_formula: true,
      input_value: '=B+C',
      id: 'A',
      parent_node_id: null,
      is_saved: true,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'C',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      is_saved: true,
      slug: 'C',
      is_formula: true,
      input_value: '=B+D',
      id: 'C',
      parent_node_id: null,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'E',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      is_saved: true,
      slug: 'E',
      is_formula: true,
      input_value: '=A+F',
      id: 'E',
      parent_node_id: null,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'D',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      is_saved: true,
      slug: 'D',
      is_formula: true,
      input_value: '=A+E',
      id: 'D',
      parent_node_id: null,
    },
    position: { x: 0, y: 0 },
  },
  // error
  {
    id: 'B',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      is_saved: true,
      slug: 'B',
      is_formula: true,
      input_value: '=A+E',
      id: 'B',
      parent_node_id: null,
    },
    position: { x: 0, y: 0 },
  },
]

describe('generateCalculatorStack', () => {
  test('should return correct stack', () => {
    try {
      const stack = generateCalculatorStack(nodes)
      console.log(stack)
      expect(stack).toEqual(['D', 'B', 'C', 'A'])
    } catch (error) {
      console.log(11111, error)
    }
  })
})
