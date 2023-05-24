import {
  RFStore,
  ReactFlowNodeData,
  isEmptyKPINodeForm,
  isReactFlowKPINode,
  useNodeDeleteMutation,
  useRFStore,
} from '@/libs/react-flow'
import React, { MouseEvent, useCallback } from 'react'
import { Node as RFNode } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'

const storeSelector = (state: RFStore) => ({
  handleNodesChange: state.handleNodesChange,
  handleEdgesChange: state.handleEdgesChange,
  setNodeFocused: state.setNodeFocused,
  scrollZoom: state.scrollZoom,
  removeEmptyNode: state.removeEmptyNode,
  setActivePosition: state.setActivePosition,
  viewportAction: state.viewportAction,
})

export const useReactFlowHandler = () => {
  const {
    handleEdgesChange,
    handleNodesChange,
    setNodeFocused,
    scrollZoom,
    removeEmptyNode,
    setActivePosition,
    viewportAction,
  } = useRFStore(storeSelector, shallow)

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
    (e: MouseEvent<Element>) => {
      e.preventDefault()

      setNodeFocused(null)

      if (
        viewportAction === ViewPortAction.Comment ||
        viewportAction === ViewPortAction.SpeechBallon
      ) {
        setActivePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
    },
    [setNodeFocused, viewportAction, setActivePosition],
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
