import { StateCreator, StoreMutatorIdentifier } from 'zustand'
import { stratifier } from '../helper'
import { RFStore, ReactFlowNode } from '../types'

type D3Middleware = <
  RFStore,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<RFStore, Mps, Mcs>,
) => StateCreator<RFStore, Mps, Mcs>

type D3MiddlewareImpl = (f: StateCreator<RFStore, [], []>) => StateCreator<RFStore, [], []>

const _d3RootMiddleware: D3MiddlewareImpl = (createStore) => (set, get, api) => {
  const wrappedSet: typeof set = (...args) => {
    const [newState] = args

    if ('nodes' in newState) {
      // Nếu 'nodes' có trong newState, tức là nodes đã thay đổi
      // Cập nhật d3Root dựa trên giá trị mới của nodes
      const updatedD3Root = stratifier(newState['nodes'] as ReactFlowNode[]) // Cập nhật d3Root dựa trên newState.nodes

      // Cập nhật d3Root trong store
      set({ d3Root: updatedD3Root })
    }

    // Gọi hàm set gốc
    return set(...args)
  }

  return createStore(wrappedSet, get, api)
}

export const d3RootMiddleware = _d3RootMiddleware as unknown as D3Middleware
