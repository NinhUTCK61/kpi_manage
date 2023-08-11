import {
  checkIncludeFormula,
  findChildNodes,
  getSlugFromInputValue,
  isNumeric,
} from '@/libs/react-flow/helper/expression'
import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { useTranslation } from 'next-i18next'

const useFormularHanlder = () => {
  const { t } = useTranslation('common')

  const nodeInputValidate = (
    inputValue: string,
    listNode: ReactFlowKPINode[],
    nodeFocused: ReactFlowKPINode,
  ) => {
    // kiểm tra nếu nhập dạng =A.2 sẽ bị lỗi
    if (inputValue.includes('.')) {
      const arr = inputValue
        .replace(/[=+\-*/]/g, ' ')
        .replace(/\s+/g, ' ')
        .split(' ')
      let error = false
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.includes('.') && !isNumeric(arr[i]?.replace('.', '') || '')) {
          error = true
          break
        }
      }
      if (error) return t('error.invalid_formula')
    }
    const _inputValue = inputValue.trim().replace('=', '')
    const slugs = getSlugFromInputValue(_inputValue)
    // kiểm tra các node trong fomurla có từng nhập node đang focus không , nếu có thì lỗi
    const nodeInvalid = slugs.find(
      (slug) =>
        !!listNode.find(
          (e) =>
            e.data.slug === slug &&
            e.data.is_formula &&
            checkIncludeFormula(nodeFocused.data.slug, e.data.input_value as string),
        ),
    )
    if (nodeInvalid) {
      return t('error.invalid_formula') + nodeInvalid + '->' + nodeFocused.data.slug
    }
    //Convert "A1+B1" to [A1,B1]
    const listNodeChild = findChildNodes(listNode, nodeFocused.data.slug, [], [])
    const list: string[] = []
    let errorMessage = ''

    slugs.forEach((slug) => {
      if (slug === '' || isNumeric(slug)) return
      if (listNodeChild.includes(slug) || slug === nodeFocused.data.slug) {
        errorMessage = t('error.formula_repetition')
        return
      }
      // kiểm tra xem node có tồn tại không
      if (!listNode.find((e) => e.data.slug === slug)) list.push(slug)
    })

    if (list.length) return list.join(',') + t('error.node_not_found')

    return errorMessage
  }

  const validateBeforeSubmit = (
    inputValue: string,
    listNode: ReactFlowKPINode[],
    nodeFocused: ReactFlowKPINode,
  ) => {
    if (inputValue === '=') {
      return t('error.invalid_formula')
    }

    return nodeInputValidate(inputValue, listNode, nodeFocused)
  }

  return { nodeInputValidate, validateBeforeSubmit }
}

export { useFormularHanlder }
