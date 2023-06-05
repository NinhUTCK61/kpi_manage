import { getSlugFromInputValue } from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'

export const generateCalculatorStack = (nodes: ReactFlowKPINode[]) => {
  const valid = new Map<string, string[] | boolean>()
  const stack: string[] = []

  nodes.forEach((node) => {
    const {
      data: { slug, is_formula, input_value },
    } = node

    if (!is_formula) return

    const expressionArr = getSlugFromInputValue(input_value as string)
    const expressionStack = [...expressionArr, slug]

    // Kiểm tra sự phụ thuộc giữa các toán hạng so với slug
    // Nếu tồn tại => lỗi
    // Nếu không tồn tại => thêm vào stack

    // validate
    expressionArr.forEach((_slug) => {
      const exists = valid.get(_slug)
      if (exists) {
        if (Array.isArray(exists) && exists.includes(slug)) {
          throw new Error(`Cyclic dependency detected: ${_slug} -> ${slug}`)
        }
      }
    })

    valid.set(slug, expressionArr)
    // validate expression
    if (!stack.length) {
      stack.push(...expressionStack)
      return
    }

    expressionArr.forEach((_slug) => {
      if (!stack.includes(_slug)) {
        stack.unshift(_slug)
        valid.set(_slug, true)
      }
    })

    let maxIndex = 0
    expressionArr.forEach((_slug) => {
      const indexSlug = stack.indexOf(_slug)
      if (indexSlug > maxIndex) {
        maxIndex = indexSlug
      }
    })

    console.log(111, maxIndex, expressionArr, slug, stack)

    // check if slug exists in stack to validate and move to the right position of maxIndex
    // else add after maxIndex

    const indexSlug = stack.indexOf(slug)
    if (indexSlug !== -1) {
      stack.splice(indexSlug, 1)
    }

    stack.splice(maxIndex + 1, 0, slug)
  })

  return stack
}
