import { isNumeric } from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { produce } from 'immer'
import { useTranslation } from 'next-i18next'
import { generateCalculatorStack } from '../helper'

const useFormularHanlder = () => {
  const { t } = useTranslation()

  const nodeInputValidate = (
    inputValue: string,
    listNode: ReactFlowKPINode[],
    nodeFocused: ReactFlowKPINode,
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
      errorMessage = t('error.invalid_formula') + list.join('=>')
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
      errorMessage = t('error.invalid_node')
      list = [nodeFocused.data.slug]
    } else {
      errorMessage = t('error.node_not_found_1') + list.join(',') + t('error.node_not_found_2')
    }

    return errorMessage
  }

  return { nodeInputValidate }
}

export { useFormularHanlder }
