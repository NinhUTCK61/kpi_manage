import { NodeType, useNodeUpdateMutation, useRFStore } from '@/libs/react-flow'
import { useUpdateSpeechBallonMutation } from '@/libs/react-flow/components/SpeechBallon/hooks'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { UpdateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { useCallback } from 'react'

type DbSavedType = {
  is_saved: boolean
}

type UpdateNodeInput = UpdateNodeInputType & DbSavedType
type UpdateSpeechBallonInput = UpdateSpeechBallonInputType & DbSavedType

export const useNodeUpdateHandler = () => {
  const updateNodeStore = useRFStore((state) => state.updateKPINode)
  const updateSpeechBallonStore = useRFStore((state) => state.updateSpeechBallon)

  const { mutate: mutateNode } = useNodeUpdateMutation()
  const { mutate: mutateSpeechBallon } = useUpdateSpeechBallonMutation()

  const updateKpiNode = useCallback(
    (newNodeData: UpdateNodeInput) => {
      // Case the node has not been saved to the database
      if (!newNodeData.is_saved) {
        updateNodeStore(newNodeData, true)
        return
      }

      mutateNode(newNodeData)
    },
    [mutateNode, updateNodeStore],
  )

  const updateSpeechBallonNode = useCallback(
    (newSpeechBallonData: UpdateSpeechBallonInput) => {
      if (!newSpeechBallonData.is_saved) {
        updateSpeechBallonStore(newSpeechBallonData, true)
        return
      }

      mutateSpeechBallon(newSpeechBallonData)
    },
    [mutateSpeechBallon, updateSpeechBallonStore],
  )

  const updateReactFlowNode = useCallback(
    (data: UpdateNodeInput | UpdateSpeechBallonInput, type: NodeType) => {
      switch (type) {
        case 'kpi':
          updateKpiNode(data)
          break
        case 'speech_ballon':
          updateSpeechBallonNode(data)
          break
        default:
          break
      }
    },
    [updateKpiNode, updateSpeechBallonNode],
  )

  return { updateReactFlowNode }
}
