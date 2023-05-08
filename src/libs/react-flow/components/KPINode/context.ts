import { createContext, useContext } from 'react'
import { KPINodeType } from '../../types'

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
