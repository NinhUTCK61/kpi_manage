import { createContext, useContext } from 'react'
import { KPINodeType } from '../../types'
import { ReactFlowKPINode } from './../../types/node'
import { StateProps } from './components/NodeFormulaProvider'

export type KPINodeContextType = {
  data: KPINodeType
  isConnectable: boolean
}

export const KPINodeContext = createContext<KPINodeContextType | null>(null)

export const KPINodeProvider = KPINodeContext.Provider

export const useKPINodeContext = () => {
  const value = useContext(KPINodeContext)

  if (!value) {
    throw new Error('useKPINodeContext must be used within a KPINodeProvider')
  }

  return value
}

export type NodeFormulaContextType = {
  state: StateProps
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
