import { checkIncludeFormula, getSlugFromInputValue } from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'

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
          // throw new Error(`Cyclic dependency detected: ${_slug} -> ${slug}`)
          throw new Error(`${_slug}->${slug}`)
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

    const indexSlug = stack.indexOf(slug)
    if (indexSlug !== -1) {
      stack.splice(indexSlug, 1)
    }

    stack.splice(maxIndex + 1, 0, slug)
  }

  return stack
}

export function generateCalculatorStackV2(input: ReactFlowKPINode[]) {
  const visited = new Set()
  const output: string[] = []

  function dfs(slug: string) {
    const item = input.find(
      (element) =>
        (element.data.slug === slug &&
          element.data.is_formula &&
          getSlugFromInputValue(element.data.input_value as string).length) ||
        input.find(
          (e) => checkIncludeFormula(slug, e.data.input_value as string) && !e.data.is_formula,
        ),
    )

    if (!item || visited.has(slug)) {
      return
    }

    visited.add(slug)

    const formula = item.data.input_value as string
    const matches = formula.match(/=([A-Z0-9]+)/g)

    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        const dependency = matches[i]?.substring(1) as string
        dfs(dependency)
      }
    }

    output.push(slug)
  }

  for (let i = 0; i < input.length; i++) {
    dfs(input[i]?.data.slug as string)
  }

  return output
}
