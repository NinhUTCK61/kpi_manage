import { getSlugFromInputValue } from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'

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

    stack.splice(maxIndex + 1, 0, slug)
  })

  return stack
}
