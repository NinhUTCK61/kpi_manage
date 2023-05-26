import {
  RFStore,
  ReactFlowNodeData,
  isEmptyKPINodeForm,
  isReactFlowKPINode,
  isReactFlowKPISpeechBallon,
  useNodeDeleteMutation,
  useRFStore,
} from '@/libs/react-flow'
import { nanoid } from 'nanoid'
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
  setActivePosition: state.setActivePosition,
  viewportAction: state.viewportAction,
  addSpeechBallon: state.addSpeechBallon,
  container: state.container,
  templateId: state.templateId,
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
    addSpeechBallon,
    container,
    templateId,
  } = useRFStore(storeSelector, shallow)

  const { mutate } = useNodeDeleteMutation()
  const { project } = useReactFlow()

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

  const addTempSpeechBallon = useCallback(
    (clientX: number, clientY: number) => {
      const id = nanoid()
      const { top } = container?.getBoundingClientRect() || { top: 0, left: 0 }
      const { x, y } = project({ x: clientX, y: clientY - top })

      addSpeechBallon({
        id,
        data: {
          id,
          template_id: templateId,
          shape: 'square',
          node_style: null,
          text: '',
          node_id: null,
          x,
          y,
          stroke: '1px',
          created_at: new Date(),
          updated_at: new Date(),
          is_saved: false,
        },
        position: { x, y },
        type: 'speech_ballon',
      })
    },
    [addSpeechBallon, container, project, templateId],
  )

  const handlePaneClick = useCallback(
    (e: MouseEvent<Element>) => {
      e.stopPropagation()

      setNodeFocused(null)

      if (viewportAction === ViewPortAction.Comment) {
        setActivePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }

      if (viewportAction === ViewPortAction.SpeechBallon) {
        addTempSpeechBallon(e.clientX, e.clientY)
      }
    },
    [setNodeFocused, viewportAction, setActivePosition, addTempSpeechBallon],
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
      if (isReactFlowKPISpeechBallon(node)) {
        setNodeFocused(node)
      }
    },
    [removeEmptyNode, setNodeFocused],
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
