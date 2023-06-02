import {
  ReactFlowKPINode,
  ReactFlowSpeechBallonNode,
  useNodeUpdateMutation,
  useRFStore,
} from '@/libs/react-flow'
import { useUpdateSpeechBallonMutation } from '@/libs/react-flow/components/SpeechBallon/hooks'
import { LayoutType } from '@prisma/client'
import { ShapeType } from '../create'

type DataType = {
  layout?: LayoutType
  shape?: ShapeType
  node_style?: string
}

export const useNodeUpdateHandler = (
  nodeFocusedMemo: ReactFlowKPINode | ReactFlowSpeechBallonNode | undefined,
) => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)

  const { mutate: mutateNode } = useNodeUpdateMutation()
  const { mutate: mutateSpeechBallon } = useUpdateSpeechBallonMutation()

  const updateStyleNode = (newNodeStyle: string) => {
    // Case the node has not been saved to the database
    if (!nodeFocusedMemo?.data.is_saved && nodeFocusedMemo) {
      updateNode({ ...nodeFocusedMemo.data, node_style: newNodeStyle }, true)
      return
    }

    mutateNode({
      id: nodeFocusedMemo?.id as string,
      node_style: newNodeStyle,
    })
  }

  const updateStyleSpeechBallon = (nodeData: DataType) => {
    if (nodeFocusedMemo) {
      const data = { ...nodeFocusedMemo.data, ...nodeData }
      updateSpeechBallon(data, true)
    }
    if (!nodeFocusedMemo?.data.is_saved) return
    mutateSpeechBallon({
      id: nodeFocusedMemo?.id as string,
      ...nodeData,
    })
  }

  const updateStyle = (data: DataType) => {
    switch (nodeFocusedMemo?.type) {
      case 'kpi':
        updateStyleNode(data.node_style as string)
        break
      case 'speech_ballon':
        updateStyleSpeechBallon(data)
        break
      default:
        break
    }
  }

  return {
    updateStyle,
  }
}
