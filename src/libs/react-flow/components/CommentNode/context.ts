import { createContext, useContext } from 'react'
import { CommentNodeType } from '../../types'

export type CommentNodeContextType = {
  data: CommentNodeType
  commentAnchor: null | HTMLDivElement | HTMLButtonElement
  handleSetCommentAnchor: (el: HTMLDivElement | HTMLButtonElement | null) => void
}

export const CommentNodeContext = createContext<CommentNodeContextType | null>(null)

// export const CommentNodeProvider = CommentNodeContext.Provider

export const useCommentNodeContext = () => {
  const value = useContext(CommentNodeContext)

  if (!value) {
    throw new Error('useCommentNodeContext must be used within a CommentNodeProvider')
  }

  return value
}
