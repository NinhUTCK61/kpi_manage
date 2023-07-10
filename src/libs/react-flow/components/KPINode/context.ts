import { ContextMenuState } from '@/libs/shared/types/utils'
import { createContext, useContext } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { KPINodeType } from '../../types'
import { NodeFormProps } from './hooks'

export type KPINodeContextType = {
  data: KPINodeType
  isConnectable: boolean
  form: UseFormReturn<NodeFormProps>
  contextMenu: ContextMenuState
  setContextMenu: (contextMenu: ContextMenuState) => void
}

export const KPINodeContext = createContext<KPINodeContextType | null>(null)

// export const KPINodeProvider = KPINodeContext.Provider

export const useKPINodeContext = () => {
  const value = useContext(KPINodeContext)

  if (!value) {
    throw new Error('useKPINodeContext must be used within a KPINodeProvider')
  }

  return value
}
