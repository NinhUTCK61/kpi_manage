import { NodeType, useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
import { useUpdateSpeechBallonMutation } from '@/libs/react-flow/components/SpeechBallon/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store/middleware'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { UpdateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { MutateOptions } from '@tanstack/react-query'
import { useCallback } from 'react'

type DbSavedType = {
  is_saved: boolean
}

type UpdateNodeInput = UpdateNodeInputType & DbSavedType
type UpdateSpeechBallonInput = UpdateSpeechBallonInputType & DbSavedType

export const useNodeUpdateHandler = (updateReason?: UpdateStateReason) => {
  const updateNodeStore = useRFStore((state) => state.updateKPINode)
  const updateSpeechBallonStore = useRFStore((state) => state.updateSpeechBallon)

  const {
    update: { mutate: mutateNode },
  } = useNodeUpdateMutation(updateReason)
  const { mutate: mutateSpeechBallon } = useUpdateSpeechBallonMutation(updateReason)

  const updateKpiNode = useCallback(
    (newNodeData: UpdateNodeInput) => {
      // Case the node has not been saved to the database
      if (!newNodeData.is_saved) {
        updateNodeStore(newNodeData, true, updateReason)
        return
      }

      mutateNode(newNodeData)
    },
    [mutateNode, updateNodeStore, updateReason],
  )

  const updateSpeechBallonNode = useCallback(
    (
      newSpeechBallonData: UpdateSpeechBallonInput,
      updatedCallback?: () => void | MutateOptions['onSuccess'],
    ) => {
      if (!newSpeechBallonData.is_saved) {
        updateSpeechBallonStore(newSpeechBallonData, true, updateReason)
        updatedCallback && updatedCallback()
        return
      }

      mutateSpeechBallon(newSpeechBallonData, {
        onSuccess: updatedCallback,
      })
    },
    [mutateSpeechBallon, updateReason, updateSpeechBallonStore],
  )

  const updateReactFlowNode = useCallback(
    (
      data: UpdateNodeInput | UpdateSpeechBallonInput,
      type: NodeType,
      updatedCallback?: () => void | MutateOptions['onSuccess'],
    ) => {
      switch (type) {
        case 'kpi':
          updateKpiNode(data)
          break
        case 'speech_ballon':
          updateSpeechBallonNode(data, updatedCallback)
          break
        default:
          break
      }
    },
    [updateKpiNode, updateSpeechBallonNode],
  )

  return { updateReactFlowNode }
}
