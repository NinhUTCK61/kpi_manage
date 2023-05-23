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

    const expressionStack = [...getSlugFromInputValue(input_value as string), slug]
    // validate expression
    if (!stack.length) {
      stack.push(...expressionStack)
      expressionStack.forEach((slug) => {
        valid.set(slug, true)
      })
    }

    expressionStack.forEach((slug) => {
      if (!valid.has(slug)) {
        stack.push(slug)
        valid.set(slug, true)
      }
    })
  })
}
