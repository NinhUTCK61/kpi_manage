import { isEqual } from 'lodash'
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

          // If there is length, we know that statesToApply is not empty
          userSet({ ...statesToApply.shift() })
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

export const validateDiffNodeState = (diff: ReactFlowNode[]): boolean => {
  if (diff.length === 0) return false

  if (diff.length === 1) {
    // case update one node like: position, data, style
    const node = diff[0] as ReactFlowNode
    // case update position => false
    if (node.position.x !== node.data.x && node.position.y) return false
    // case adds new empty node => false
    if (node.type === 'kpi' && !node.data.is_saved) return false
  }

  if (diff.some((el) => el.type === 'comment')) return false

  return true
}
