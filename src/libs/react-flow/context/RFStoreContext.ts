import { createContext } from 'react'
import { createRFStore } from '../store'

export const RFStoreContext = createContext<ReturnType<typeof createRFStore> | null>(null)
