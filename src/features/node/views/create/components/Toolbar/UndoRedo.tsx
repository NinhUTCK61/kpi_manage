import {
  ReactFlowKPINode,
  UpdatedReason,
  onStateChange,
  useNodeCreateMutation,
  useNodeDeleteMutation,
  useRFStore,
  useTemporalStore,
} from '@/libs/react-flow'
import { UpdateStateReason } from '@/libs/react-flow/store/middleware'
import { Stack } from '@mui/material'
import { consola } from 'consola'
import Image from 'next/image'
import RedoInactive from 'public/assets/svgs/redo.svg'
import RedoActive from 'public/assets/svgs/redo_active.svg'
import UndoInactive from 'public/assets/svgs/undo.svg'
import UndoActive from 'public/assets/svgs/undo_active.svg'
import { FC, useCallback } from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'

const UndoRedo: FC = () => {
  const { undo, redo, pastStates, futureStates, setOnStateChange } = useTemporalStore(
    (state) => state,
    shallow,
  )
  const currentState = useRFStore(
    (state) => ({
      nodes: state.nodes,
      nodeFocused: state.nodeFocused,
    }),
    shallow,
  )

  const { mutate: create } = useNodeCreateMutation(UpdateStateReason.OnUndoRedo)
  const { handleDelete } = useNodeDeleteMutation(UpdateStateReason.OnUndoRedo)

  const onStateChange: onStateChange = useCallback(
    (stateToApply, type) => {
      consola.withTag(type).info(stateToApply)
      const { nodes, updatedReason } = stateToApply
      const { oldDiff, newDiff, updateStateReason } = updatedReason as UpdatedReason
      switch (updateStateReason) {
        case UpdateStateReason.RemoveNodeById:
          if (type === 'undo') {
            create((oldDiff[0] as ReactFlowKPINode).data)
          } else {
          }
          break
        case UpdateStateReason.AddEmptyKPINode:
          if (type === 'undo') {
          } else {
          }
          break
        case UpdateStateReason.AddKPINode:
          if (type === 'undo') {
            handleDelete((newDiff[0] as ReactFlowKPINode).id)
          } else {
          }
          break
        default:
          break
      }
    },
    [create, handleDelete],
  )

  useIsomorphicLayoutEffect(() => {
    setOnStateChange(onStateChange)
  }, [setOnStateChange, onStateChange])

  const canRedo = futureStates.length > 0
  const canUndo = pastStates.length > 0

  return (
    <Stack direction="row" spacing={2} mr={3}>
      <Image
        src={canUndo ? UndoActive : UndoInactive}
        onClick={() => undo()}
        alt="undo"
        style={{ cursor: canUndo ? 'pointer' : 'auto' }}
      />

      <button
        onClick={() => {
          console.log(pastStates)
        }}
      >
        past state
      </button>

      <button
        onClick={() => {
          console.log(currentState)
        }}
      >
        current state
      </button>

      <button
        onClick={() => {
          console.log(futureStates)
        }}
      >
        future state
      </button>

      <Image
        src={canRedo ? RedoActive : RedoInactive}
        onClick={() => redo()}
        alt="redo"
        style={{ cursor: canRedo ? 'pointer' : 'auto' }}
      />
    </Stack>
  )
}

export { UndoRedo }
