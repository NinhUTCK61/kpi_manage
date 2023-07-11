import { getSlugFromInputValue } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { useKPINodeContext } from '../context'

const useErrorState = () => {
  let error = false
  const { data } = useKPINodeContext()
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)

  const slugs = (data.is_formula && getSlugFromInputValue(data.input_value as string)) || []
  const listSlugError = []
  if (slugs.length) {
    listSlugError.push(
      ...slugs.filter((slug) => !getKpiNodes().find((node) => node.data.slug === slug)),
    )
  }
  error = !!listSlugError.length
  return { error, listSlugError }
}

export { useErrorState }
