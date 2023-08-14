import {
  KPINodeType,
  NAME_INPUT_COMMENT,
  ReactFlowSpeechBallonNode,
  SpeechBallonNodeType,
  UpdatedReason,
  onStateChange,
  useNodeCreateMutation,
  useNodeDeleteMutation,
  useNodeUpdateMutation,
  useRFStore,
  useSpeechBallonCreateMutation,
  useSpeechBallonDeleteMutation,
  useTemporalStore,
  useUpdateSpeechBallonMutation,
} from '@/libs/react-flow'
import { UpdateStateReason } from '@/libs/react-flow/store'
import { Stack } from '@mui/material'
import { consola } from 'consola'
import Image from 'next/image'
import RedoInactive from 'public/assets/svgs/redo.svg'
import RedoActive from 'public/assets/svgs/redo_active.svg'
import UndoInactive from 'public/assets/svgs/undo.svg'
import UndoActive from 'public/assets/svgs/undo_active.svg'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { shallow } from 'zustand/shallow'

declare global {
  interface Window {
    logPastState: () => void
    logNodesState: () => void
    logFeatureState: () => void
  }
}

const UndoRedo: FC = () => {
  const { undo, redo, pastStates, futureStates, setOnStateChange } = useTemporalStore(
    (state) => state,
    shallow,
  )

  const { nodes } = useRFStore((state) => ({ nodes: state.nodes }), shallow)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { mutate: createKPI } = useNodeCreateMutation(UpdateStateReason.OnUndoRedo)
  const { handleDelete: delKPI } = useNodeDeleteMutation(UpdateStateReason.OnUndoRedo)
  const {
    update: { mutate: updateKPI },
    bulkUpdate: { mutate: bulkUpdateKPI },
  } = useNodeUpdateMutation(UpdateStateReason.OnUndoRedo)

  const { mutate: createSB } = useSpeechBallonCreateMutation(UpdateStateReason.OnUndoRedo)
  const { mutate: updateSB } = useUpdateSpeechBallonMutation(UpdateStateReason.OnUndoRedo)
  const { mutate: deleteSB } = useSpeechBallonDeleteMutation(UpdateStateReason.OnUndoRedo)

  useEffect(() => {
    window.logPastState = () => console.log(pastStates)
    window.logNodesState = () => console.log(nodes)
    window.logFeatureState = () => console.log(futureStates)
  }, [futureStates, nodes, pastStates])

  const onStateChange: onStateChange = useCallback(
    (stateToApply, type) => {
      consola.withTag(type).info(stateToApply)
      const { nodes, updatedReason } = stateToApply
      const { updateBy } = updatedReason as UpdatedReason
      switch (updateBy.updateStateReason) {
        case UpdateStateReason.RemoveKPINodeById:
          {
            const nodeId = updateBy.payload as string
            const nodeData = nodes?.find((node) => node.id === nodeId)?.data as KPINodeType
            if (type === 'undo') {
              createKPI(nodeData)
            } else {
              delKPI(nodeId, true)
            }
          }
          break
        case UpdateStateReason.AddKPINode:
          {
            const nodeData = updateBy.payload as KPINodeType
            if (type === 'undo') {
              delKPI(nodeData.id, true)
            } else {
              createKPI(nodeData)
            }
          }
          break
        case UpdateStateReason.UpdateKPINode:
          {
            const newNodeData = updateBy.payload as KPINodeType
            const oldNodeData = nodes?.find((node) => node.id === newNodeData.id)?.data
            if (type === 'undo') {
              updateKPI(oldNodeData as KPINodeType)
            } else {
              updateKPI(newNodeData)
            }
          }
          break
        case UpdateStateReason.BulkUpdateKpiNodes:
          {
            const nodesUpdated = updateBy.payload as KPINodeType[]
            const updatedIds = nodesUpdated.map((node) => node.id)
            const oldNodesData = nodes
              ?.filter((node) => updatedIds.includes(node.id))
              .map((node) => node.data) as KPINodeType[]

            if (type === 'undo') {
              bulkUpdateKPI(oldNodesData)
            } else {
              bulkUpdateKPI(nodesUpdated)
            }
          }
          break
        case UpdateStateReason.AddSpeechBallonNode:
          {
            const nodeData = (updateBy.payload as ReactFlowSpeechBallonNode).data
            if (type === 'undo') {
              deleteSB({ id: nodeData.id })
            } else {
              createSB(nodeData)
            }
          }
          break
        case UpdateStateReason.UpdateSpeechBallonNodeData:
        case UpdateStateReason.UpdateSpeechBallonNodePosition:
        case UpdateStateReason.UpdateSpeechBallonNodeSize:
          {
            const newNodeData = updateBy.payload as KPINodeType
            const oldNodeData = nodes?.find((node) => node.id === newNodeData.id)?.data
            if (type === 'undo') {
              updateSB(oldNodeData as KPINodeType)
            } else {
              updateSB(newNodeData)
            }
          }
          break
        case UpdateStateReason.DeleteSpeechBallonNode:
          {
            const nodeId = updateBy.payload as string
            const nodeData = nodes?.find((node) => node.id === nodeId)?.data as SpeechBallonNodeType
            if (type === 'undo') {
              createSB(nodeData)
            } else {
              deleteSB({ id: nodeId })
            }
          }
          break
        default:
          break
      }
    },
    [bulkUpdateKPI, createKPI, createSB, delKPI, deleteSB, updateKPI, updateSB],
  )

  useIsomorphicLayoutEffect(() => {
    setOnStateChange(onStateChange)
  }, [setOnStateChange, onStateChange])

  let focusInput = false

  if (document.activeElement instanceof HTMLElement) {
    const element = document.activeElement as HTMLInputElement
    console.log(document.activeElement)
    if (
      (element.type === 'text' || element.type === 'textarea') &&
      element.name !== NAME_INPUT_COMMENT
    ) {
      focusInput = true
    }
  }

  const isNodeSaved = useMemo(() => {
    if (!nodeFocused || (nodeFocused && nodeFocused.type === 'comment')) return true
    return (
      (nodeFocused.type === 'kpi' || nodeFocused.type === 'speech_ballon') &&
      nodeFocused.data.is_saved
    )
  }, [nodeFocused])

  const canRedo = isNodeSaved && !focusInput && futureStates.length > 0
  const canUndo = isNodeSaved && !focusInput && pastStates.length > 0

  return (
    <Stack direction="row" spacing={2} mr={3}>
      <Image
        src={canUndo ? UndoActive : UndoInactive}
        onClick={() => canUndo && undo()}
        alt="undo"
        style={{
          cursor: canUndo ? 'pointer' : 'auto',
        }}
      />

      <Image
        src={canRedo ? RedoActive : RedoInactive}
        onClick={() => canRedo && redo()}
        alt="redo"
        style={{
          cursor: canRedo ? 'pointer' : 'auto',
        }}
      />
    </Stack>
  )
}

export { UndoRedo }
