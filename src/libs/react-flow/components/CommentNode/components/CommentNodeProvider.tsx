import { CommentNodeType } from '@/libs/react-flow/types'
import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { CommentNodeContext } from '../context'

export const CommentNodeProvider: React.FC<
  PropsWithChildren<{
    data: CommentNodeType
  }>
> = ({ children, data }) => {
  const [commentAnchor, setCommentAnchor] = useState<null | HTMLButtonElement | HTMLDivElement>(
    null,
  )

  const handleSetCommentAnchor = useCallback((el: HTMLDivElement | HTMLButtonElement | null) => {
    setCommentAnchor(el)
  }, [])

  const contextValue = useMemo(
    () => ({ data, commentAnchor, handleSetCommentAnchor }),
    [data, commentAnchor, handleSetCommentAnchor],
  )

  return <CommentNodeContext.Provider value={contextValue}>{children}</CommentNodeContext.Provider>
}
