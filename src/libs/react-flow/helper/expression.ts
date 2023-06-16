import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { produce } from 'immer'
import * as math from 'mathjs'
import { generateCalculatorStack } from '../components/KPINode/helper'

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

const checkIncludeFormulaWithSlugs = (
  slugs: string[],
  node: ReactFlowKPINode,
  defaultSlug: string,
) => {
  const inputValue = node.data.input_value as string
  const matches = inputValue
    .replace('=', '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')

  return !!matches.find((slug) => slugs.includes(slug) || slug === defaultSlug)
}

//get list node change value2number when one node in formula change
export const getDiffValue2Number = (
  nodeFocused: ReactFlowKPINode,
  listNodeChange: ReactFlowKPINode[],
) => {
  const nodes: ReactFlowKPINode[] = []
  const slugs = generateCalculatorStack(listNodeChange)
  console.log('slugs', slugs)
  let _listNOdeChange = listNodeChange
  const listSlugWithNodeFocused: string[] = []

  slugs.forEach((slug) => {
    const node = _listNOdeChange.find((e) => e.data.slug === slug && e.data.is_formula)
    if (!node) return

    if (
      !listSlugWithNodeFocused.includes(slug) &&
      checkIncludeFormulaWithSlugs(listSlugWithNodeFocused, node, nodeFocused.data.slug)
    ) {
      listSlugWithNodeFocused.push(slug)
      const { value2Number } = calculatorValue2number(
        node.data.input_value as string,
        _listNOdeChange,
      )
      //todo: Cập nhật giá trị value2number mới cho node đó
      _listNOdeChange = produce(_listNOdeChange, (draft) => {
        const _node = draft.find((e) => e.id === node.id)
        if (_node) {
          _node.data.value2number = value2Number
        }
      })

      nodes.push({
        ...node,
        data: {
          ...node.data,
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
  nodeFocused: ReactFlowKPINode,
) => {
  let list: string[] = []
  let error: string | null = null

  try {
    generateCalculatorStack(
      produce(listNode, (draft) => {
        const node = draft.find((e) => e.id === nodeFocused.id)
        if (node) {
          node.data.input_value = inputValue
          node.data.is_formula = true
        }
      }),
    )
  } catch (error) {
    list = (error as { message: string })?.message.split(':')
    error = 'invalid_formula'
    return { list, error }
  }

  const _inputValue = inputValue.trim().replace('=', '')
  if (!_inputValue) return { list, error }
  //Convert "A1+B1" to [A1,B1]
  _inputValue
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .forEach((slug) => {
      if (slug === '' || isNumeric(slug)) return
      if (slug === nodeFocused.data.slug) {
        list.push(slug)
        return
      }
      if (!listNode.find((e) => e.data.slug === slug)) list.push(slug)
    })
  if (list.length === 0) return { list, error }

  if (list.includes(nodeFocused.data.slug)) {
    error = 'invalid_node'
    list = [nodeFocused.data.slug]
  } else {
    error = 'node_not_found'
  }

  return { list, error }
}
