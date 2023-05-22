import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { CommentNodeType } from '../../types'

export type CommentNodeContextType = {
  data: CommentNodeType
  active: null | HTMLElement
  setActive: Dispatch<SetStateAction<HTMLElement | null>>
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
