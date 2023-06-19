import { isNumeric } from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { produce } from 'immer'
import { generateCalculatorStack } from '../helper'

const nodeInputValidate = (
  inputValue: string,
  listNode: ReactFlowKPINode[],
  nodeFocused: ReactFlowKPINode,
  messageInvalidFormula: string,
  messageInvalidNode: string,
  messageNodeNotFound1: string,
  messageNodeNotFound2: string,
) => {
  let list: string[] = []
  let errorMessage = ''

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
    errorMessage = messageInvalidFormula + list.join('=>')
    console.log(1111, errorMessage)
    return errorMessage
  }

  const _inputValue = inputValue.trim().replace('=', '')
  if (!_inputValue) return errorMessage
  //Convert "A1+B1" to [A1,B1]
  _inputValue
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .forEach((slug) => {
      if (slug === '' || isNumeric(slug)) return errorMessage
      if (slug === nodeFocused.data.slug) {
        list.push(slug)
        return
      }
      if (!listNode.find((e) => e.data.slug === slug)) list.push(slug)
    })
  if (list.length === 0) return errorMessage

  if (list.includes(nodeFocused.data.slug)) {
    errorMessage = messageInvalidNode
    list = [nodeFocused.data.slug]
  } else {
    errorMessage = messageNodeNotFound1 + list.join(',') + messageNodeNotFound2
  }

  return errorMessage
}

export { nodeInputValidate }
