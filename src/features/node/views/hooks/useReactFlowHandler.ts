import {
  RFStore,
  ReactFlowNodeData,
  isEmptyKPINodeForm,
  isReactFlowKPINode,
  useNodeDeleteMutation,
  useRFStore,
} from '@/libs/react-flow'
import React, { MouseEvent, useCallback } from 'react'
import { Node as RFNode, useReactFlow } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { ViewPortAction } from '../../constant'

const storeSelector = (state: RFStore) => ({
  handleNodesChange: state.handleNodesChange,
  handleEdgesChange: state.handleEdgesChange,
  setNodeFocused: state.setNodeFocused,
  scrollZoom: state.scrollZoom,
  removeEmptyNode: state.removeEmptyNode,
  viewPortAction: state.viewportAction,
  addComment: state.addComment,
})

export const useReactFlowHandler = () => {
  const {
    handleEdgesChange,
    handleNodesChange,
    setNodeFocused,
    scrollZoom,
    removeEmptyNode,
    viewPortAction,
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

  const { project } = useReactFlow()
  const handlePaneClick = useCallback(
    (
      e: MouseEvent<Element>,
      containerRef: HTMLDivElement | null,
      handleContextMenu: () => void,
    ) => {
      setNodeFocused(null)
      const { top, left } = containerRef?.getBoundingClientRect() ?? { top: 0, left: 0 }
      const position = project({ x: e.clientX - left, y: e.clientY - top })
      console.log(position)

      if (viewPortAction === ViewPortAction.Comment) {
        handleContextMenu()
        console.log(e.clientX, e.clientY)
      }
    },
    [setNodeFocused, viewPortAction, project],
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
