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
      undo: (steps = 1) => {
        if (get().pastStates.length) {
          // userGet must be called before userSet
          const currentState = userGet()

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
          const currentState = userGet()

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
        const currentState = {
          nodes: userGet().nodes,
          edges: userGet().edges,
          nodeFocused: userGet().nodeFocused,
        }

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
