import {
  ReactFlowKPINode,
  ReactFlowSpeechBallonNode,
  useNodeUpdateMutation,
  useRFStore,
} from '@/libs/react-flow'
import { useUpdateSpeechBallonMutation } from '@/libs/react-flow/components/SpeechBallon/hooks'
import { LayoutType } from '@prisma/client'
import { ShapeType } from '../create'

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

  const updateStyleSpeechBallon = (newNodeStyle: string) => {
    if (nodeFocusedMemo) {
      const data = { ...nodeFocusedMemo.data, node_style: newNodeStyle }
      updateSpeechBallon(data, true)
    }
    if (!nodeFocusedMemo?.data.is_saved) return
    mutateSpeechBallon({
      id: nodeFocusedMemo?.id as string,
      node_style: newNodeStyle,
    })
  }

  const updateStyle = (newNodeStyle: string) => {
    switch (nodeFocusedMemo?.type) {
      case 'kpi':
        updateStyleNode(newNodeStyle)
        break
      case 'speech_ballon':
        updateStyleSpeechBallon(newNodeStyle)
        break
      default:
        break
    }
  }

  const updateSpeechBallonLayout = (typeLayout: LayoutType) => {
    if (!nodeFocusedMemo) return
    const data = { ...nodeFocusedMemo.data, layout: typeLayout }
    updateSpeechBallon(data, true)

    if (!nodeFocusedMemo?.data.is_saved) return
    mutateSpeechBallon({
      id: data.id,
      layout: typeLayout,
    })
  }

  const updateSpeechBallonShape = (typeShape: ShapeType) => {
    if (!nodeFocusedMemo) return
    const data = { ...nodeFocusedMemo.data, shape: typeShape }
    updateSpeechBallon(data, true)

    if (!nodeFocusedMemo?.data.is_saved) return
    mutateSpeechBallon({
      id: data.id,
      shape: typeShape,
    })
  }

  return {
    updateStyle,
    updateSpeechBallonLayout,
    updateSpeechBallonShape,
  }
}
