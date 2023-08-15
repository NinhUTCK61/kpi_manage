import { ViewPortAction } from '@/features/node'
import { differenceWith, isEqual } from 'lodash'
import type { StateCreator, StoreApi } from 'zustand'
import {
  RFStore,
  ReactFlowNode,
  TemporalOptions,
  TemporalRFStoreState,
  _TemporalState,
} from '../types'
import { UpdateStateReason } from './constants'

const ignoreUpdateNodeFocused = [
  UpdateStateReason.UpdateKPINode,
  UpdateStateReason.BulkUpdateKpiNodes,
  UpdateStateReason.AddKPINode,
]

export const temporalStateCreator = (
  userSet: StoreApi<RFStore>['setState'],
  userGet: StoreApi<RFStore>['getState'],
  options?: TemporalOptions,
) => {
  const stateCreator: StateCreator<_TemporalState, [], []> = (set, get) => {
    return {
      pastStates: options?.pastStates || [],
      futureStates: options?.futureStates || [],
      getCurrentState: () => {
        return {
          nodes: userGet().nodes,
          edges: userGet().edges,
          nodeFocused: userGet().nodeFocused,
        }
      },
      undo: (steps = 1) => {
        if (get().pastStates.length) {
          // userGet must be called before userSet
          const currentState = get().getCurrentState()
          const statesToApply = get().pastStates.splice(-steps, steps)
          const stateToApply = statesToApply.shift() as TemporalRFStoreState

          // current comment nodes
          const commentNodes =
            currentState.nodes?.filter((node: ReactFlowNode) => node.type === 'comment') || []

          // remove all comment on stateToApply.nodes and replace with commentNodes
          const nodeToApply = stateToApply?.nodes
            ?.filter((n) => n.type !== 'comment')
            .concat(commentNodes)

          const rfStoreState: Partial<RFStore> = {
            nodes: nodeToApply,
            edges: stateToApply?.edges || [],
            // nodeFocused: stateToApply?.nodeFocused,
            viewportAction: stateToApply?.viewportAction || ViewPortAction.Move,
          }

          // Khi update node không focus vào node đó
          // để tránh tình trạng node active với form rỗng
          const updateReason = stateToApply?.updatedReason?.updateBy.updateStateReason
          if (updateReason && !ignoreUpdateNodeFocused.includes(updateReason)) {
            rfStoreState.nodeFocused = stateToApply?.nodeFocused
          }

          // If there is length, we know that statesToApply is not empty
          get()._onStateChange?.(stateToApply, 'undo')
          userSet(rfStoreState)
          set({
            pastStates: get().pastStates,
            futureStates: get().futureStates.concat(
              { ...currentState, updatedReason: stateToApply?.updatedReason },
              statesToApply.reverse(),
            ),
          })
        }
      },
      redo: (steps = 1) => {
        if (get().futureStates.length) {
          // userGet must be called before userSet
          const currentState = get().getCurrentState()

          const statesToApply = get().futureStates.splice(-steps, steps)
          const stateToApply = statesToApply.shift() as TemporalRFStoreState

          // current comment nodes
          const commentNodes =
            currentState.nodes?.filter((node: ReactFlowNode) => node.type === 'comment') || []

          // remove all comment on stateToApply.nodes and replace with commentNodes
          const nodeToApply = stateToApply?.nodes
            ?.filter((n) => n.type !== 'comment')
            .concat(commentNodes)

          const rfStoreState: Partial<RFStore> = {
            nodes: nodeToApply,
            edges: stateToApply?.edges || [],
            // nodeFocused: stateToApply?.nodeFocused,
            viewportAction: stateToApply?.viewportAction || ViewPortAction.Move,
          }

          // Khi update node không focus vào node đó
          // để tránh tình trạng node active với form rỗng
          const updateReason = stateToApply?.updatedReason?.updateBy.updateStateReason
          if (updateReason && !ignoreUpdateNodeFocused.includes(updateReason)) {
            rfStoreState.nodeFocused = stateToApply?.nodeFocused
          }

          get()._onStateChange?.(stateToApply, 'redo')

          // If there is length, we know that statesToApply is not empty
          userSet(rfStoreState)
          set({
            pastStates: get().pastStates.concat(
              { ...currentState, updatedReason: stateToApply?.updatedReason },
              statesToApply.reverse(),
            ),
            futureStates: get().futureStates,
          })
        }
      },
      clear: () => set({ pastStates: [], futureStates: [] }),
      setOnStateChange: (_onStateChange) => set({ _onStateChange }),
      // Internal properties
      _onStateChange: options?.onStateChange,
      _handleSet: (pastState, updatedReason) => {
        const currentState = get().getCurrentState()
        const pastTemporalState = { ...pastState, updatedReason }

        if (!isEqual(pastState, currentState)) {
          set({
            pastStates: get().pastStates.concat(pastTemporalState),
            futureStates: [],
          })
        }
      },
    }
  }

  // Cast to a version of the store that does not include "temporal" addition
  return stateCreator as StateCreator<_TemporalState, [], []>
}

export const validateDiffNodeState = (
  pastNodes: ReactFlowNode[],
  newNodes: ReactFlowNode[],
  updateBy: RFStore['updateBy'],
): { isValid: boolean; oldDiff: ReactFlowNode[]; newDiff: ReactFlowNode[] } => {
  const updateReason = updateBy?.updateStateReason ?? UpdateStateReason.Unknown
  const [oldDiff, newDiff] = getDifferenceNodesByData(pastNodes, newNodes)

  if (updateReason === UpdateStateReason.OnUndoRedo) {
    return { isValid: false, oldDiff, newDiff }
  }

  let isValid = false

  switch (updateReason) {
    case UpdateStateReason.AddKPINode:
    case UpdateStateReason.UpdateKPINode:
    case UpdateStateReason.BulkUpdateKpiNodes:
    case UpdateStateReason.RemoveKPINodeById:
      isValid = true
      break
    case UpdateStateReason.AddSpeechBallonNode:
    case UpdateStateReason.UpdateSpeechBallonNodePosition:
    case UpdateStateReason.UpdateSpeechBallonNodeData:
    case UpdateStateReason.UpdateSpeechBallonNodeSize:
    case UpdateStateReason.DeleteSpeechBallonNode:
      isValid = true
      break
    default:
      break
  }

  return { isValid, oldDiff, newDiff }
}

function getDifferenceNodesByData<T extends ReactFlowNode>(
  pastNodes: T[],
  newNodes: T[],
): [ReactFlowNode[], ReactFlowNode[]] {
  const comparator = (a: ReactFlowNode, b: ReactFlowNode) =>
    a.id === b.id && isEqual(a.data, b.data)

  const oldDiff = differenceWith(pastNodes, newNodes, comparator)
  const newDiff = differenceWith(newNodes, pastNodes, comparator)

  return [oldDiff, newDiff]
}
