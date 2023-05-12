import {
  RFStore,
  ReactFlowNodeData,
  isEmptyKPINodeForm,
  isReactFlowKPINode,
  useNodeDeleteMutation,
  useRFStore,
} from '@/libs/react-flow'
import { MouseEvent, useCallback } from 'react'
import { Node as RFNode } from 'reactflow'
import { shallow } from 'zustand/shallow'

const storeSelector = (state: RFStore) => ({
  handleNodesChange: state.handleNodesChange,
  handleEdgesChange: state.handleEdgesChange,
  setNodeFocused: state.setNodeFocused,
  scrollZoom: state.scrollZoom,
  removeEmptyNode: state.removeEmptyNode,
})

export const useReactFlowHandler = () => {
  const { handleEdgesChange, handleNodesChange, setNodeFocused, scrollZoom } = useRFStore(
    storeSelector,
    shallow,
  )

  const { mutate } = useNodeDeleteMutation()

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (event.ctrlKey) {
        // Ctrl key is pressed
        const delta = event.deltaY
        // Handle scroll event here
        if (delta > 0) {
          scrollZoom()
        } else {
          scrollZoom(true)
        }
      }
    },
    [scrollZoom],
  )

  const handlePaneClick = useCallback(
    (_: MouseEvent<Element>) => {
      setNodeFocused('')
    },
    [setNodeFocused],
  )

  const handleNodesDelete = useCallback(
    (nodes: RFNode[]) => {
      const rm = nodes[0] as RFNode
      mutate({ id: rm.id })
    },
    [mutate],
  )

  const handleNodeClick = useCallback(
    (e: MouseEvent, node: RFNode<ReactFlowNodeData>) => {
      if (isReactFlowKPINode(node) && !isEmptyKPINodeForm(node.data)) {
        removeEmptyNode()
      }
    },
    [removeEmptyNode],
  )

  return {
    handleWheel,
    handleNodesChange,
    handleEdgesChange,
    handlePaneClick,
    handleNodesDelete,
    handleNodeClick,
  }
}
