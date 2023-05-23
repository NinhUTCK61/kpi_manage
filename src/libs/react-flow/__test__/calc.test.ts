import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { describe, expect, test } from 'vitest'
import { DEFAULT_NODE_ATTRIBUTES } from '../constant'
import { getSlugFromInputValue } from '../helper/expression'

export const generateCalculatorStack = (nodes: ReactFlowKPINode[]) => {
  const valid = new Map()
  const stack: string[] = []

  nodes.forEach((node) => {
    const {
      data: { slug, is_formula, input_value },
    } = node

    if (!is_formula) return

    const expressionArr = getSlugFromInputValue(input_value as string)
    const expressionStack = [...expressionArr, slug]

    valid.set(slug, expressionArr)
    // validate expression
    if (!stack.length) {
      stack.push(...expressionStack)
      return
    }

    let maxIndex = 0
    expressionArr.forEach((_slug) => {
      if (!stack.includes(_slug)) {
        stack.unshift(_slug)
        valid.set(_slug, true)
      }

      const indexSlug = stack.indexOf(slug)
      if (indexSlug > maxIndex) {
        maxIndex = indexSlug
      }
    })

    // check if slug exists in stack to validate and move to the right position of maxIndex
    // else add after maxIndex

    const indexSlug = stack.indexOf(slug)
    if (indexSlug !== -1) {
      stack.splice(indexSlug, 1)
    }

    stack.splice(maxIndex, 0, slug)
  })

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
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'C',
    data: {
      ...DEFAULT_NODE_ATTRIBUTES,
      slug: 'C',
      is_formula: true,
      input_value: '=B+D',
      id: 'C',
      parent_node_id: null,
    },
    position: { x: 0, y: 0 },
  },
]

describe('generateCalculatorStack', () => {
  test('should return correct stack', () => {
    const stack = generateCalculatorStack(nodes)
    console.log(stack)
    expect(stack).toEqual(['D', 'B', 'C', 'A'])
  })
})
