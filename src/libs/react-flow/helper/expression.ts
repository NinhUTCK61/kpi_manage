import { ReactFlowKPINode } from '@/libs/react-flow/types'
import * as math from 'mathjs'

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
  try {
    const nodeParse = math.parse(str)
    nodeParse.traverse(function (node: math.MathNode) {
      if (node.type === 'SymbolNode') {
        slugs.push((node as math.SymbolNode).name)
      }
    })
  } catch (error) {}
  return slugs
}

function isNumeric(str: string) {
  return /^-?\d+(\+\d+)?$/.test(str)
}

// convert "A+B" to value2Number
export const calculatorValue2number = (inputValue: string, nodes: ReactFlowKPINode[]) => {
  let value2Number = 0
  let error = false
  if (!inputValue) return { value2Number, error }

  const _inputValue = inputValue.trim().replace('=', '')
  const _slugs = getSlugFromInputValue(_inputValue)
  const slugData: { [key: string]: number } = {}
  //convert data nodes to slugData
  nodes.forEach((node) => {
    if (_slugs.includes(node.data.slug)) {
      slugData[node.data.slug] = node.data.value2number || 0
    }
  })

  try {
    const node = math.parse(_inputValue) // parse 'A1+A2'
    value2Number = node.evaluate(slugData) // slugData = {A1: 1, A2: 2}
  } catch (_error) {
    error = true
  }
  return { value2Number, error }
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
    const { value2Number } = calculatorValue2number(
      nodeChange.data.input_value as string,
      listNodeChange,
    )

    if (checkIncludeFormula(node.data.slug, nodeChange)) {
      nodes.push({
        ...nodeChange,
        data: {
          ...nodeChange.data,
          value2number: value2Number,
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
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .forEach((slug) => {
      if (slug === '' || isNumeric(slug)) return
      if (slug === nodeFocuses.data.slug) {
        list.push(slug)
        return
      }
      console.log('slug', slug)
      if (!listNode.find((e) => e.data.slug === slug)) list.push(slug)
    })
  return list
}
