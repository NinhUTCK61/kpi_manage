import {
  ReactFlowKPINode,
  ReactFlowSpeechBallonNode,
  useNodeUpdateMutation,
  useRFStore,
} from '@/libs/react-flow'
import { useUpdateSpeechBallonMutation } from '@/libs/react-flow/components/SpeechBallon/hooks'

export const useReactFlowUpdateNode = (
  nodeFocusedMemo: ReactFlowKPINode | ReactFlowSpeechBallonNode | undefined,
) => {
  const updateNode = useRFStore((state) => state.updateKPINode)
  const updateSpeechBallon = useRFStore((state) => state.updateSpeechBallon)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { mutate: update } = useNodeUpdateMutation()
  const { mutate: updateSbApi } = useUpdateSpeechBallonMutation()

  const handleUpdateStyleNode = (newNodeStyle: string) => {
    // Case the node has not been saved to the database
    if (!nodeFocusedMemo?.data.is_saved && nodeFocusedMemo) {
      const data = { ...nodeFocusedMemo.data, node_style: newNodeStyle }
      nodeFocusedMemo.data = data
      updateNode({ ...nodeFocusedMemo.data, node_style: newNodeStyle }, true)
      return
    }

    update({
      id: nodeFocusedMemo?.id as string,
      node_style: newNodeStyle,
    })
  }

  const handleUpdateStyleSpeechBallon = (newNodeStyle: string) => {
    if (nodeFocusedMemo) {
      const data = { ...nodeFocusedMemo.data, node_style: newNodeStyle }
      nodeFocusedMemo.data = data
      updateSpeechBallon(data)
      setNodeFocused(nodeFocusedMemo)
      updateSbApi({
        id: nodeFocusedMemo?.id as string,
        node_style: newNodeStyle,
      })
    }
  }
  const handleValidType = (newNodeStyle: string) => {
    switch (nodeFocusedMemo?.type) {
      case 'kpi':
        handleUpdateStyleNode(newNodeStyle)
        break
      case 'speech_ballon':
        handleUpdateStyleSpeechBallon(newNodeStyle)
        break
      default:
        break
    }
  }
  const handleUpdateStroke = (typeLayout: string) => {
    if (!nodeFocusedMemo) return
    const data = { ...nodeFocusedMemo.data, stroke: typeLayout }
    nodeFocusedMemo.data = data
    updateSpeechBallon(data)
    setNodeFocused(nodeFocusedMemo)
    if (nodeFocusedMemo.data.is_saved) {
      updateSbApi({
        id: nodeFocusedMemo?.id as string,
      })
    }
  }
  return {
    handleValidType,
    handleUpdateStroke,
  }
}
