import { findChildNodes, isNumeric } from '@/libs/react-flow/helper/expression'
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

    if (inputValue.includes('.')) {
      const arr = inputValue
        .replace(/[=+\-*/]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
      let pass = false

      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.includes('.') && !isNumeric(arr[i]?.replace('.', '') ?? '')) {
          pass = true
          break
        }
      }
      if (pass) return t('error.invalid_formula')
    }

    try {
      const _listNode = produce(listNode, (draft) => {
        const node = draft.find((e) => e.id === nodeFocused.id)
        if (node) {
          node.data.input_value = inputValue
          node.data.is_formula = true
        }
      })
      generateCalculatorStack(_listNode)
    } catch (error) {
      list = (error as { message: string })?.message.split(':')
      return t('error.invalid_formula') + list.join('=>')
    }

    const _inputValue = inputValue.trim().replace('=', '')
    if (!_inputValue) return errorMessage
    const findChild = findChildNodes(listNode, nodeFocused.data.slug, [], [])

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

        if (findChild.includes(slug)) {
          errorMessage = t('error.formula_repetition')
          return errorMessage
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
