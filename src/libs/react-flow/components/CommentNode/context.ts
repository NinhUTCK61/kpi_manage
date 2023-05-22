import { createContext, useContext } from 'react'
import { CommentNodeType } from '../../types'

export type CommentNodeContextType = {
  data: CommentNodeType
}

export const CommentNodeContext = createContext<CommentNodeContextType | null>(null)

export const CommentNodeProvider = CommentNodeContext.Provider

export const useCommentNodeContext = () => {
  const value = useContext(CommentNodeContext)

  if (!value) {
    throw new Error('useCommentNodeContext must be used within a CommentNodeProvider')
  }

  return value
}
