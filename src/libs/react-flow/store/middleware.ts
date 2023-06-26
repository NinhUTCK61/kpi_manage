import { difference } from 'lodash'
import { Mutate, StateCreator, StoreApi, StoreMutatorIdentifier, createStore } from 'zustand'
import { stratifier } from '../helper'
import {
  RFStore,
  ReactFlowKPINode,
  ReactFlowNode,
  TemporalState,
  Write,
  _TemporalState,
} from '../types'
import { temporalStateCreator } from './temporal'

declare module 'zustand/vanilla' {
  interface StoreMutators<S, A> {
    temporal: Write<S, { temporal: A }>
  }
}

type D3Middleware = <
  RFStore,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<RFStore, [...Mps, ['temporal', unknown]], Mcs>,
) => StateCreator<RFStore, Mps, Mcs>

// type D3MiddlewareImpl = (f: StateCreator<RFStore, [], []>) => StateCreator<RFStore, [], []>

const _d3RootMiddleware = (configStore: StateCreator<RFStore, [], []>) => {
  const configWithTemporal = (
    set: StoreApi<RFStore>['setState'],
    get: StoreApi<RFStore>['getState'],
    api: Mutate<StoreApi<RFStore>, [['temporal', StoreApi<TemporalState>]]>,
  ) => {
    api.temporal = createStore(temporalStateCreator(set, get))

    const handleSetTemporal = (api.temporal.getState() as _TemporalState)._handleSet

    const wrappedSet: typeof set = (...args) => {
      const [newState] = args
      console.log('new State', newState)

      if ('nodes' in newState) {
        // Nếu 'nodes' có trong newState, tức là nodes đã thay đổi
        // Cập nhật d3Root dựa trên giá trị mới của nodes
        // Get Node type = kpi

        const kpiNodes = (newState['nodes'] as ReactFlowKPINode[]).filter(
          (node: ReactFlowNode) => node.type === 'kpi',
        )
        const updatedD3Root = stratifier(kpiNodes) // Cập nhật d3Root dựa trên newState.nodes

        // Cập nhật d3Root trong store
        set({ d3Root: updatedD3Root })
      }

      const pastNodes = get().nodes
      const pastEdges = get().edges
      const pastNodeFocused = get().nodeFocused
      // Gọi hàm set gốc
      set(...args)

      if ('nodes' in newState) {
        console.log('diff', difference(pastNodes, newState.nodes))
        handleSetTemporal({
          nodes: pastNodes,
          edges: pastEdges,
          nodeFocused: pastNodeFocused,
        })
      }
    }

    return configStore(wrappedSet, get, api)
  }

  return configWithTemporal as StateCreator<RFStore, [], []>
}

export const d3RootMiddleware = _d3RootMiddleware as unknown as D3Middleware
