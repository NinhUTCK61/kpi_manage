import { useRouter } from 'next/router'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

const useClearParam = () => {
  const router = useRouter()
  useIsomorphicLayoutEffect(() => {
    router.push(
      {
        query: {},
      },
      undefined,
      { shallow: true },
    )
  }, [])
}

export { useClearParam }
