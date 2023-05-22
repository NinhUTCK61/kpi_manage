import { CommentNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { CommentNodeContext } from '../context'

export const CommentNodeProvider: React.FC<
  PropsWithChildren<{
    data: CommentNodeType
  }>
> = ({ children, data }) => {
  const [active, setActive] = useState<null | HTMLDivElement>(null)

  const handleSetActive = useCallback((el: HTMLDivElement | null) => {
    setActive(el)
  }, [])

  const contextValue = useMemo(
    () => ({ data, active, handleSetActive }),
    [active, data, handleSetActive],
  )

  return <CommentNodeContext.Provider value={contextValue}>{children}</CommentNodeContext.Provider>
}
