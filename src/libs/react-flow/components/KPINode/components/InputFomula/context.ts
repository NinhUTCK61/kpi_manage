import { ReactFlowKPINode } from '@/libs/react-flow/types'
import { createContext, useContext } from 'react'
import { SuggestStateProps } from './NodeFormulaProvider'

export type NodeFormulaContextType = {
  suggestState: SuggestStateProps
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleSelect: (value: string) => void
  handleClick: (e: React.MouseEvent<HTMLInputElement>) => void
  nodeSearch: ReactFlowKPINode[]
  elementRef: React.RefObject<HTMLUListElement> | null
}

export const NodeFormulaContext = createContext<NodeFormulaContextType | null>(null)

export const useNodeFormulaContext = () => {
  const value = useContext(NodeFormulaContext)

  if (!value) {
    throw new Error('useCommentNodeContext must be used within a CommentNodeProvider')
  }

  return value
}
