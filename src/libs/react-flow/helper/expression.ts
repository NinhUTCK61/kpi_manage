import { ReactFlowKPINode } from '@/libs/react-flow/types'
import * as math from 'mathjs'
import { evaluate } from 'mathjs'

const sliceKeyInsideSpace = (inputString: string, cursorPosition: number) => {
  const spaceBeforeIndex = inputString.lastIndexOf(' ', cursorPosition - 1)
  const spaceAfterIndex = inputString.indexOf(' ', cursorPosition)
  const startIndex = spaceBeforeIndex + 1
  const endIndex = spaceAfterIndex !== -1 ? spaceAfterIndex : inputString.length
  const resultString = inputString.substring(startIndex, endIndex).replace(/[^a-zA-Z]/g, ' ')
  return resultString
}

const sliceKeyInsideSpaceFullSlug = (inputString: string, cursorPosition: number) => {
  const spaceBeforeIndex = inputString.lastIndexOf(' ', cursorPosition - 1)
  const spaceAfterIndex = inputString.indexOf(' ', cursorPosition)
  const startIndex = spaceBeforeIndex + 1
  const endIndex = spaceAfterIndex !== -1 ? spaceAfterIndex : inputString.length
  const resultStringFull = inputString.substring(startIndex, endIndex)
  const resultString = inputString.substring(startIndex, endIndex).replace(/[^a-zA-Z]/g, ' ')

  return { resultString, resultStringFull, startIndex, endIndex }
}

export const charNearCursor = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const inputElement = e.target as HTMLInputElement
  const selectionStart = inputElement.selectionStart
  if (selectionStart && selectionStart >= 1 && selectionStart <= inputElement.value.length) {
    return sliceKeyInsideSpace(inputElement.value.replace(/[^a-zA-Z0-9]/g, ' '), selectionStart)
  }
}

export const charFullNearCursor = (
  e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>,
) => {
  const inputElement = e.target as HTMLInputElement
  const selectionStart = inputElement.selectionStart
  if (selectionStart && selectionStart >= 1 && selectionStart <= inputElement.value.length) {
    return sliceKeyInsideSpaceFullSlug(
      inputElement.value.replace(/[^a-zA-Z0-9]/g, ' '),
      selectionStart,
    )
  }
}

export const getSlugFromInputValue = (inputValue: string) => {
  const str = inputValue.trim().replace('=', '')
  const slugs: string[] = []
  const nodeParse = math.parse(str)
  nodeParse.traverse(function (node: math.MathNode) {
    if (node.type === 'SymbolNode') {
      slugs.push((node as math.SymbolNode).name)
    }
  })

  return slugs
}

function isNumeric(str: string) {
  return /^-?\d+(\+\d+)?$/.test(str)
}

// convert "A+B" to value2Number
export const calculatorValue2number = (inputValue: string, nodes: ReactFlowKPINode[]) => {
  // let output = ''
  // let lastIndex = 0
  if (!inputValue) return 0

  const _inputValue = inputValue.trim().replace('=', '')
  // const matches = _inputValue
  //   .replace('=', '')
  //   .replace(/[^a-zA-Z0-9]/g, ' ')
  //   .split(' ')
  // if (!matches?.length) return 0

  // const components = matches.map((match) => {
  //   const start = _inputValue.indexOf(match, lastIndex)
  //   const end = start + match.length - 1
  //   lastIndex = end + 1
  //   return { text: match, start, end }
  // })

  // if (!components.length) return 0
  // console.log(components)
  // components.forEach((component, index) => {
  //   let value = 0
  //   if (!isNumeric(component.text)) {
  //     const node = nodes.find((node) => node.data.slug === component.text)
  //     value = node?.data.value2number || 0 // Assign 0 if component is not found in values
  //   } else {
  //     value = Number(component.text)
  //   }

  //   const indexString = Number(components[index - 1]?.end) + 1
  //   if (index !== 0) {
  //     const separator = _inputValue.substring(indexString, component.start)
  //     console.log('separator', separator)
  //     output += separator
  //   }
  //   console.log(value, output)
  //   output += value
  //   if (index === components.length - 1) {
  //     output += _inputValue.substring(component.end + 1)
  //   }
  // })

  const _nodes = nodes.map((node) => {
    return { slug: node.data.slug, value: node.data.value2number || 0 }
  })

  console.log('_nodes', _nodes)

  const output = _inputValue.replace(/[A-Z][0-9]+|[A-Z]/g, (match) => {
    const item = _nodes.find((element) => element.slug === match)
    if (item) {
      return String(item.value)
    } else {
      return match
    }
  })

  return evaluate(output)
}

export const convertFormula = (
  inputValue: string,
  valueReplace: string,
  startIndex: number,
  endIndex: number,
) => {
  return inputValue.substring(0, startIndex) + valueReplace + inputValue.substring(endIndex)
}

const checkIncludeFormula = (slug: string, node: ReactFlowKPINode) => {
  const inputValue = node.data.input_value as string
  const matches = inputValue
    .replace('=', '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')

  return matches.includes(slug)
}

//get list node change value2number when one node in formula change
export const getDiffValue2Number = (node: ReactFlowKPINode, listNodeChange: ReactFlowKPINode[]) => {
  const nodes: ReactFlowKPINode[] = []

  listNodeChange.forEach((nodeChange) => {
    if (checkIncludeFormula(node.data.slug, nodeChange)) {
      nodes.push({
        ...nodeChange,
        data: {
          ...nodeChange.data,
          value2number: calculatorValue2number(
            nodeChange.data.input_value as string,
            listNodeChange,
          ),
        },
      })
    }
  })

  return nodes
}

export const getListNodeInvalid = (
  inputValue: string,
  listNode: ReactFlowKPINode[],
  nodeFocuses: ReactFlowKPINode,
) => {
  const list: string[] = []
  const _inputValue = inputValue.trim().replace('=', '')
  if (!_inputValue) return list
  //Convert "A1+B1" to [A1,B1]
  _inputValue
    .replace(/[^a-zA-Z]/g, ' ')
    .split(' ')
    .forEach((slug) => {
      if (slug === '') return
      if (slug.toUpperCase() === nodeFocuses.data.slug) {
        list.push(slug)
        return
      }
      if (!listNode.find((e) => e.data.slug.toUpperCase() === slug.toUpperCase())) list.push(slug)
    })
  return list
}

// const arrayInput = [
//   { text: 'A1', value: 1 },
//   { text: 'A2', value: 2 },
//   { text: 'A11', value: 3 },
//   { text: 'B1', value: 4 },
//   { text: 'B2', value: 5 },
//   { text: 'B11', value: 6 },
// ]
// const valueTest = '=A1+A2--B1-B2+A11+B11'

// const output = valueTest.replace(/[A-Z][0-9]+/g, (match: string) => {
//   const item = arrayInput.find((element) => element.text === match)
//   if (item) {
//     return String(item.value)
//   } else {
//     return match
//   }
// })
// console.log(output)
