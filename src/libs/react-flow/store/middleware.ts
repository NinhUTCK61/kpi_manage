import { consola } from 'consola'
import { produce } from 'immer'
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
import { DiffReason, temporalStateCreator, validateDiffNodeState } from './temporal'

declare module 'zustand/vanilla' {
  interface StoreMutators<S, A> {
    temporal: Write<S, { temporal: A }>
  }
}

type KPIMiddleware = <
  RFStore,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<RFStore, [...Mps, ['temporal', unknown]], Mcs>,
) => StateCreator<RFStore, Mps, Mcs>

// type D3MiddlewareImpl = (f: StateCreator<RFStore, [], []>) => StateCreator<RFStore, [], []>

const _KPIMiddleware = (configStore: StateCreator<RFStore, [], []>) => {
  const configWithTemporal = (
    set: StoreApi<RFStore>['setState'],
    get: StoreApi<RFStore>['getState'],
    api: Mutate<StoreApi<RFStore>, [['temporal', StoreApi<TemporalState>]]>,
  ) => {
    api.temporal = createStore(temporalStateCreator(set, get))

    const handleSetTemporal = (api.temporal.getState() as _TemporalState)._handleSet

    const wrappedSet: typeof set = (...args) => {
      const [newState] = args

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

      let pastNodes = get().nodes
      const pastEdges = get().edges
      const pastNodeFocused = get().nodeFocused
      console.log('------------------------------------------------------------')
      console.log('newState', newState)
      // Gọi hàm set gốc
      set(...args)
      if ('nodes' in newState) {
        console.log('state', pastNodes, newState.nodes)
        const { isValid, reason, oldDiff, newDiff } = validateDiffNodeState(
          pastNodes,
          newState.nodes as ReactFlowNode[],
        )

        if (isValid) {
          consola.withTag('VALID').info('diff', oldDiff, newDiff, reason)
        } else {
          consola.log('diff', oldDiff, isValid, reason)
        }
        if (isValid) {
          switch (reason) {
            case DiffReason.UpdatePosition:
              pastNodes = produce(pastNodes, (draft) => {
                oldDiff.forEach((node) => {
                  const nodeIdx = draft.findIndex((n) => n.id === node.id)
                  const rightPos = {
                    x: node.data.x,
                    y: node.data.y,
                  }

                  if (nodeIdx !== -1) {
                    ;(draft[nodeIdx] as ReactFlowNode).position = rightPos
                    ;(draft[nodeIdx] as ReactFlowNode).positionAbsolute = rightPos
                  }
                })
              })
              break
            default:
              break
          }
          const pastState: Partial<RFStore> = {
            nodes: pastNodes,
            edges: pastEdges,
          }

          if (pastNodeFocused?.type !== 'kpi') {
            pastState.nodeFocused = pastNodeFocused
          }

          handleSetTemporal(pastState)
        }
      }
    }

    return configStore(wrappedSet, get, api)
  }

  return configWithTemporal as StateCreator<RFStore, [], []>
}

export const kpiMiddleware = _KPIMiddleware as unknown as KPIMiddleware
