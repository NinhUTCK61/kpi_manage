import { getSlugFromInputValue } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useTranslation } from 'next-i18next'
import { useKPINodeContext } from '../context'

const useErrorState = (check?: boolean, inputValue?: string) => {
  let error = false
  const { data } = useKPINodeContext()
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const { t } = useTranslation('common')

  if (check && !inputValue) {
    return { error, message: '' }
  }
  const slugs =
    (data.is_formula && getSlugFromInputValue(inputValue || (data.input_value as string))) || []
  const listSlugError = []
  if (slugs.length) {
    listSlugError.push(
      ...slugs.filter((slug) => !getKpiNodes().find((node) => node.data.slug === slug)),
    )
  }
  error = !!listSlugError.length
  const message = data.slug + ' : ' + listSlugError.join(',') + t('error.node_not_found')
  return { error, message }
}

export { useErrorState }
