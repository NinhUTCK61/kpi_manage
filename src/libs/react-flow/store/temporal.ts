import { differenceWith, isEqual } from 'lodash'
import type { StateCreator, StoreApi } from 'zustand'
import { RFStore, ReactFlowNode, TemporalOptions, _TemporalState } from '../types'

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

          const statesApply = statesToApply.shift()

          // If there is length, we know that statesToApply is not empty
          userSet({ ...statesApply })
          set({
            pastStates: get().pastStates,
            futureStates: get().futureStates.concat(currentState, statesToApply.reverse()),
          })
        }
      },
      redo: (steps = 1) => {
        if (get().futureStates.length) {
          // userGet must be called before userSet
          const currentState = get().getCurrentState()

          const statesToApply = get().futureStates.splice(-steps, steps)

          // If there is length, we know that statesToApply is not empty
          userSet({ ...statesToApply.shift() })
          set({
            pastStates: get().pastStates.concat(currentState, statesToApply.reverse()),
            futureStates: get().futureStates,
          })
        }
      },
      clear: () => set({ pastStates: [], futureStates: [] }),
      setOnSave: (_onSave) => set({ _onSave }),
      // Internal properties
      _onSave: options?.onSave,
      _handleSet: (pastState) => {
        const currentState = get().getCurrentState()

        if (!isEqual(pastState, currentState)) {
          console.log('run handle set', pastState.nodes)
          console.log('------------------------------------------------------------')
          get()._onSave?.(pastState.nodes as ReactFlowNode[], currentState.nodes as ReactFlowNode[])
          set({
            pastStates: get().pastStates.concat(pastState),
            futureStates: [],
          })
        }
      },
    }
  }

  // Cast to a version of the store that does not include "temporal" addition
  return stateCreator as StateCreator<_TemporalState, [], []>
}

export enum DiffReason {
  NoDiff = 'NoDiff',
  Unknown = 'Unknown',
  AddNewEmptyNode = 'AddNewEmptyNode',
  AddNewComment = 'AddNewComment',
  // Valid reasons
  UpdatePosition = 'UpdatePosition',
}

export const validateDiffNodeState = (
  pastNodes: ReactFlowNode[],
  newNodes: ReactFlowNode[],
): { isValid: boolean; reason: DiffReason; oldDiff: ReactFlowNode[]; newDiff: ReactFlowNode[] } => {
  const [oldDiff, newDiff] = getDifferenceNodesByData(pastNodes, newNodes)

  let isValid = true
  let reason: DiffReason = DiffReason.Unknown

  if (oldDiff.length === 0 || newDiff.length === 0) {
    isValid = false
    reason = DiffReason.NoDiff
  }

  if (oldDiff.length === 1) {
    const node = oldDiff[0] as ReactFlowNode
    // case update position => true
    if (node.position.x !== node.data.x || node.position.y !== node.data.y) {
      isValid = true
      reason = DiffReason.UpdatePosition

      return { isValid, reason, oldDiff, newDiff }
    }
  }

  if (newDiff.length === 1) {
    // case update one node like: position, data, style
    const node = newDiff[0] as ReactFlowNode
    // case update position => true
    // case adds new empty node => false
    if (node.type === 'kpi' && !node.data.is_saved) {
      isValid = false
      reason = DiffReason.AddNewEmptyNode
    }

    if (node.type === 'speech_ballon' && !node.data.is_saved) {
      isValid = false
      reason = DiffReason.AddNewComment
    }
  }

  if (newDiff.some((el) => el.type === 'comment')) {
    isValid = false
    reason = DiffReason.AddNewComment
  }

  return { isValid, reason, oldDiff, newDiff }
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
