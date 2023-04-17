import { useRef } from 'react'
import { StoreApi } from 'zustand'
import { RFStoreContext } from '../context'
import { createRFStore } from '../store'
import { RFStore } from '../types'

type TemplateProviderProps = React.PropsWithChildren<Partial<RFStore>>

function TemplateProvider({ children, ...props }: TemplateProviderProps) {
  const storeRef = useRef<StoreApi<RFStore> | null>(null)

  if (!storeRef.current) {
    storeRef.current = createRFStore(props)
  }
  return <RFStoreContext.Provider value={storeRef.current}>{children}</RFStoreContext.Provider>
}

export { TemplateProvider }
