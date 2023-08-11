import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { produce } from 'immer'
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

export function isNumeric(str: string) {
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

export const checkIncludeFormula = (slug: string, inputValue: string) => {
  const matches = inputValue
    .replace('=', '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')

  return matches.includes(slug)
}

// Lấy tất cả các nodes đã nhập node trong formula
export const getNodeIncludeSlug = (node: ReactFlowKPINode, nodes: ReactFlowKPINode[]) => {
  const formulaNodes = nodes.filter(
    (e) =>
      e.data.is_formula &&
      e.data.input_value &&
      checkIncludeFormula(node.data.slug, e.data.input_value),
  )

  return formulaNodes.map((e) => e.data.slug)
}

//get list node change value2number when one node in formula change
export const getDiffValue2Number = (
  nodeFocused: ReactFlowKPINode | string,
  listNodeChange: ReactFlowKPINode[],
) => {
  const nodes: ReactFlowKPINode[] = []
  // const slugs = generateCalculatorStackV2(listNodeChange)
  let _listNOdeChange = listNodeChange
  // Chỉ lấy các node liên quan tới nodeFocused(các node đã nhập nodeFocused vào formula)
  const slugNodeFocused = typeof nodeFocused === 'string' ? nodeFocused : nodeFocused.data.slug
  const slugs = findChildNodesV2(_listNOdeChange, slugNodeFocused)
  slugs.forEach((slug) => {
    const node = _listNOdeChange.find((e) => e.data.slug === slug && e.data.is_formula)
    if (!node) return

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
  })
  return nodes
}

// const input1 = [
//   {
//     slug: 'A',
//     formula: '=C',
//   },
//   {
//     slug: 'A1',
//     formula: '=A11+1',
//   },
//   {
//     slug: 'A11',
//     formula: '=A111/B1',
//   },
//   {
//     slug: 'A111',
//     formula: '=A',
//   },
//   {
//     slug: 'B',
//     formula: '=A111',
//   },
//   {
//     slug: 'B1',
//     formula: '=A111*C',
//   },
//   {
//     slug: 'C',
//     formula: '123',
//   },
//   {
//     slug: 'C1',
//     formula: '=C-A111',
//   },
//   {
//     slug: 'D',
//     formula: '11',
//   },
//   {
//     slug: 'E',
//     formula: '10',
//   },
// ]
// findChildNodes(input1, 'A') => ['A111', 'A11', 'A1']
export function findChildNodes(
  nodes: ReactFlowKPINode[],
  parent: string,
  checkedNodes: string[] = [],
  childNodes: string[] = [],
) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i] as ReactFlowKPINode
    if (
      node.data.is_formula &&
      node.data.input_value &&
      !checkedNodes.includes(node.data.slug) &&
      getSlugFromInputValue(node.data.input_value).includes(parent)
    ) {
      checkedNodes.push(node.data.slug)
      childNodes.push(node.data.slug)
      findChildNodes(nodes, node.data.slug, checkedNodes, childNodes)
    }
  }

  return childNodes
}

// array = ['A','root','B'] , elementToAddAfter = 'root', newElement = 'B' => ['A','B','root']
function updateArrayByElement(array: string[], elementToAddAfter: string, newElement: string) {
  const index = array.indexOf(elementToAddAfter)
  const _array = array.filter((e) => e !== newElement)
  if (index !== -1) {
    // Sử dụng phương thức splice để thêm newElement vào sau phần tử có giá trị elementToAddAfter
    _array.splice(index, -1, newElement)
  }
  return _array
}

export function findChildNodesV2(nodes: ReactFlowKPINode[], parent: string) {
  let output: string[] = []
  const slugsChild = findChildNodes(nodes, parent, [], [])
  for (let i = 0; i < slugsChild.length; i++) {
    const slug = slugsChild[i] as string
    const slugsChildBySlug = findChildNodes(nodes, slug, [], [])
    output = output.length ? output : slugsChild

    if (!slugsChildBySlug) continue

    //Neu node nay dung truoc node cha cua no(slug), thi node này sẽ tính la lỗi
    const nodeError = output.filter(
      (e) => slugsChildBySlug.includes(e) && output.indexOf(e) < output.indexOf(slug),
    )

    if (!nodeError.length) continue
    // ví dụ : slugs =['A', 'root', 'C11', 'C1', 'C111', 'C', 'B1', 'B', 'B11', 'B111']
    // các node con của slug = B1 là  ['root', 'C11', 'C111', 'C1', 'C']
    // cần cho slug B1 lên trước vị trí root, vì root là con gần nhất so với B1
    output = updateArrayByElement(output, nodeError[0] as string, slug)
  }
  return output
}

export function findChildNodesV3(nodes: ReactFlowKPINode[], parent: string) {
  const slugsChild = findChildNodes(nodes, parent, [], [])
  let output: string[] = []
  for (let i = 0; i < slugsChild.length; i++) {
    const slug = slugsChild[i] as string
    const slugsParentBySlug = findParentNodes(nodes, slug, [], [])
    output = output.length ? output : slugsChild

    if (!slugsParentBySlug.length) continue

    // nếu node này đứng trước vị trí của các node cha của nó, thì các node đứng sau sẽ tính là lỗi
    const errorNode = output.filter(
      (e) => slugsParentBySlug.includes(e) && output.indexOf(e) > output.indexOf(slug),
    )
    if (!errorNode.length) continue

    // Ví dụ: slugs = ['A', 'root', 'C11', 'C1', 'C111', 'C', 'B1', 'B', 'B11', 'B111']
    // các node cha của root(slug) là ['A', 'A1', 'B', 'B1', 'B11', 'B111']
    // nhưng root(slug) đang đứng trước các node ['B1', 'B', 'B11', 'B111']
    // foreact các node lỗi này để đưa lên trước vị trí của root(slug)

    errorNode.forEach((e) => {
      // adđ vị trí các node cha bị sai lên trước node này
      output = updateArrayByElement(output, slug, e)
    })
  }
  return output
}

//findParentNodes(input1, 'A111') => ['A', 'C']
export function findParentNodes(
  nodes: ReactFlowKPINode[],
  child: string,
  checkedNodes: string[] = [],
  parentNodes: string[] = [],
) {
  const node = nodes.find((e) => e.data.slug === child && e.data.is_formula && e.data.input_value)

  if (!node) return [...parentNodes]
  const slug = getSlugFromInputValue(node.data.input_value as string)
  for (let i = 0; i < slug.length; i++) {
    const _slug = slug[i] as string
    const _node = nodes.find((e) => e.data.slug === _slug)
    if (_node && !checkedNodes.includes(_slug)) {
      checkedNodes.push(_slug)
      parentNodes.push(_slug)
      findParentNodes(nodes, _slug, checkedNodes, parentNodes)
    }
  }

  return parentNodes
}
