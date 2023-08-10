import { env } from '@/env.mjs'
import { consola } from 'consola'
import { produce } from 'immer'
import { Mutate, StateCreator, StoreApi, StoreMutatorIdentifier, createStore } from 'zustand'
import { stratifier } from '../helper'
import {
  RFStore,
  ReactFlowKPINode,
  ReactFlowNode,
  SpeechBallonNodeType,
  TemporalState,
  Write,
  _TemporalState,
} from '../types'
import { UpdateStateReason } from './constants'
import { temporalStateCreator, validateDiffNodeState } from './temporal'

declare module 'zustand/vanilla' {
  interface StoreMutators<S, A> {
    temporal: Write<S, { temporal: A }>
  }
}

const debug = env.NEXT_PUBLIC_STORE_MIDDLEWARE_DEBUG

type KPIMiddleware = <
  RFStore,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  f: StateCreator<RFStore, [...Mps, ['temporal', unknown]], Mcs>,
) => StateCreator<RFStore, Mps, Mcs>

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
      const viewPort = get().viewportAction

      if (debug) {
        if (
          typeof newState === 'object' &&
          newState.updateBy?.updateStateReason &&
          newState.updateBy.updateStateReason !== UpdateStateReason.NodesChangeByReactFlow &&
          newState.updateBy.updateStateReason !== UpdateStateReason.RemoveEmptyNode &&
          newState.updateBy.updateStateReason !== UpdateStateReason.RemoveEmptyKPINode &&
          newState.updateBy.updateStateReason !== UpdateStateReason.RemoveEmptySpeechBallonNode
        ) {
          consola.log('----------------------------START--------------------------------')
          consola.log('newState', newState)
        }
      }

      // Gọi hàm set gốc
      set(...args)
      if ('nodes' in newState) {
        const updateBy = newState.updateBy as RFStore['updateBy']
        const updateReason = newState.updateBy?.updateStateReason ?? UpdateStateReason.Unknown
        // console.log('state', pastNodes, newState.nodes)
        const { isValid, oldDiff, newDiff } = validateDiffNodeState(
          pastNodes,
          newState.nodes as ReactFlowNode[],
          updateBy,
        )

        if (debug && isValid) {
          consola.withTag('VALID').success('reason : ', updateReason)
          consola.withTag('VALID').info('oldDiff', oldDiff)
          consola.withTag('VALID').info('newDiff', newDiff)
        }

        if (isValid) {
          switch (updateReason) {
            case UpdateStateReason.UpdateSpeechBallonNodePosition:
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
            case UpdateStateReason.UpdateSpeechBallonNodeSize:
              pastNodes = produce(pastNodes, (draft) => {
                const nodeIdx = draft.findIndex(
                  (n) => n.id === (updateBy.payload as SpeechBallonNodeType).id,
                )
                draft[nodeIdx] = {
                  ...draft[nodeIdx],
                  ...(
                    updateBy.payload as SpeechBallonNodeType & {
                      defaultDimensions: Partial<ReactFlowNode>
                    }
                  ).defaultDimensions,
                } as ReactFlowNode
              })
              break
            default:
              break
          }
          const pastState: Partial<RFStore> = {
            nodes: pastNodes,
            edges: pastEdges,
            nodeFocused: pastNodeFocused,
            viewportAction: viewPort,
          }

          handleSetTemporal(pastState, { updateBy, oldDiff, newDiff })
        }
      }
    }

    return configStore(wrappedSet, get, api)
  }

  return configWithTemporal as StateCreator<RFStore, [], []>
}

export const kpiMiddleware = _KPIMiddleware as KPIMiddleware
