import { useContext } from 'react'
import { Mutate, StoreApi, useStore } from 'zustand'
import { RFStoreContext } from '../context'
import { RFStore, TemporalState } from '../types'

type ExtractState = StoreApi<RFStore> extends { getState: () => infer T } ? T : never

export function useRFStore<StateSlice = ExtractState>(
  selector: (state: RFStore) => StateSlice,
  equalityFn?: (left: StateSlice, right: StateSlice) => boolean,
): StateSlice {
  const store = useContext(RFStoreContext)
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  return useStore(store, selector, equalityFn)
}

export function useTemporalStore<StateSlice = ExtractState>(
  selector: (state: TemporalState) => StateSlice,
  equalityFn?: (left: StateSlice, right: StateSlice) => boolean,
): StateSlice {
  const store = useContext(RFStoreContext) as Mutate<
    StoreApi<RFStore>,
    [['temporal', StoreApi<TemporalState>]]
  >
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  return useStore(store.temporal, selector, equalityFn)
}
