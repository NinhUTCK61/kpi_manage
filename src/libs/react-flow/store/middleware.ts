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
import { temporalStateCreator, validateDiffNodeState } from './temporal'

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

export enum UpdateStateReason {
  Unknown = 'Unknown',
  Init = 'Init',
  Undo = 'Undo',
  Redo = 'Redo',
  NodesChangeByReactFlow = 'NodesChangeByReactFlow',
  EdgesChangeByReactFlow = 'EdgesChangeByReactFlow',
  AddKPINode = 'AddKPINode',
  AddSpeechBallonNode = 'AddSpeechBallonNode',
  DeleteKPINode = 'DeleteKPINode',
  DeleteSpeechBallonNode = 'DeleteSpeechBallonNode',
  UpdateKPINode = 'UpdateKPINode',
  UpdateNodeFocused = 'UpdateNodeFocused',
  UpdateNodePosition = 'UpdateNodePosition',
  BulkUpdateKpiNodes = 'BulkUpdateKpiNodes',

  UpdateSpeechBallonNodeData = 'UpdateSpeechBallonNodeData',
  UpdateSpeechBallonNodePosition = 'UpdateSpeechBallonNodePosition',

  AddCommentNode = 'AddCommentNode',
  UpdateCommentNode = 'UpdateCommentNode',
  DeleteCommentNode = 'DeleteCommentNode',
  AddCommentReply = 'AddCommentReply',
  UpdateCommentReply = 'UpdateCommentReply',
  DeleteCommentReply = 'DeleteCommentReply',

  RemoveNodeById = 'RemoveNodeById',
  RemoveEdge = 'RemoveEdge',

  RemoveEmptyNode = 'RemoveEmptyNode',

  UpdateEdge = 'UpdateEdge',

  RemoveEmptyKPINode = 'RemoveEmptyKPINode',
  RemoveEmptySpeechBallonNode = 'RemoveEmptySpeechBallonNode',

  ToggleDraggable = 'ToggleDraggable',
}

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
      if (
        typeof newState === 'object' &&
        newState.updateStateReason !== UpdateStateReason.NodesChangeByReactFlow
      ) {
        console.log('----------------------------START--------------------------------')
        console.log('newState', newState)
      }
      // Gọi hàm set gốc
      set(...args)
      if ('nodes' in newState) {
        const updateReason = newState.updateStateReason ?? UpdateStateReason.Unknown
        // console.log('state', pastNodes, newState.nodes)
        const { isValid, oldDiff, newDiff } = validateDiffNodeState(
          pastNodes,
          newState.nodes as ReactFlowNode[],
          updateReason,
        )

        if (isValid) {
          consola.withTag('VALID').info('oldDiff', oldDiff, updateReason)
          consola.withTag('VALID').info('newDiff', newDiff, updateReason)
        } else {
          if (
            typeof newState === 'object' &&
            newState.updateStateReason !== UpdateStateReason.NodesChangeByReactFlow
          ) {
            consola.log('oldDiff', oldDiff)
            consola.log('newDiff', newDiff)
            console.log(isValid, updateReason)
          }
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
            default:
              break
          }
          const pastState: Partial<RFStore> = {
            nodes: pastNodes,
            edges: pastEdges,
            nodeFocused: pastNodeFocused,
            viewportAction: viewPort,
          }

          // if (pastNodeFocused?.type !== 'kpi') {
          //   pastState.nodeFocused = pastNodeFocused
          // }

          handleSetTemporal(pastState)
        }
      }
    }

    return configStore(wrappedSet, get, api)
  }

  return configWithTemporal as StateCreator<RFStore, [], []>
}

export const kpiMiddleware = _KPIMiddleware as KPIMiddleware
