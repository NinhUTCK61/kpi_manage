import {
  DEFAULT_SPEECH_BALLON_ATTRIBUTES,
  PANE_CLASS_NAME,
  RFStore,
  ReactFlowNodeData,
  isEmptyKPINodeForm,
  isReactFlowKPINode,
  isSpeechBallonData,
  useCommentUpdateMutation,
  useNodeDeleteMutation,
  useRFStore,
  useSpeechBallonDeleteMutation,
  useUpdateSpeechBallonMutation,
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
  removeEmptyKPINode: state.removeEmptyKPINode,
  setActivePosition: state.setActivePosition,
  viewportAction: state.viewportAction,
  changeViewportAction: state.changeViewportAction,
  addSpeechBallon: state.addSpeechBallon,
  container: state.container,
  templateId: state.templateId,
  nodeFocused: state.nodeFocused,
  removeEmptyNode: state.removeEmptyNode,
  removeSpeechBallonNode: state.removeSpeechBallon,
  getNodeById: state.getNodeById,
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
    changeViewportAction,
    addSpeechBallon,
    container,
    templateId,
    nodeFocused,
    getNodeById,
    removeSpeechBallonNode,
  } = useRFStore(storeSelector, shallow)

  const { handleDelete: deleteKPINode } = useNodeDeleteMutation()
  const { mutate: deleteSpeechBallonNode } = useSpeechBallonDeleteMutation()
  const { mutate: updateCommentNode } = useCommentUpdateMutation()
  const { mutate: updateSpeechBallonNode } = useUpdateSpeechBallonMutation()
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

      addSpeechBallon(
        {
          id,
          data: {
            ...DEFAULT_SPEECH_BALLON_ATTRIBUTES,
            id,
            template_id: templateId,
            node_id: null,
            x,
            y,
            created_at: new Date(),
            updated_at: new Date(),
            is_saved: false,
          },
          position: { x, y },
          type: 'speech_ballon',
        },
        true,
      )
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

      if (viewportAction === ViewPortAction.SpeechBallon && !nodeFocused) {
        addTempSpeechBallon(e.clientX, e.clientY)
      }
    },
    [setNodeFocused, viewportAction, nodeFocused, setActivePosition, addTempSpeechBallon],
  )

  const handleNodesDelete = useCallback(
    (nodes: RFNode[]) => {
      const rm = nodes[0] as RFNode

      switch (rm.type) {
        case 'comment':
          break
        case 'speech_ballon':
          if (rm.data.is_saved) {
            deleteSpeechBallonNode({ id: rm.id })
          } else {
            removeSpeechBallonNode(rm.id)
          }
          break
        case 'kpi':
          deleteKPINode(rm.id)
          break
        default:
          break
      }
    },
    [deleteKPINode, deleteSpeechBallonNode, removeSpeechBallonNode],
  )

  const handleNodeClick = useCallback(
    (e: MouseEvent, node: RFNode<ReactFlowNodeData>) => {
      setNodeFocused(node.id)
      removeEmptyNode({
        ignoreFocusNode: nodeFocused?.type !== 'kpi',
        ignoreKpi: isReactFlowKPINode(node) && isEmptyKPINodeForm(node.data),
      })
    },
    [nodeFocused?.type, removeEmptyNode, setNodeFocused],
  )

  const handleNodeDragStart = useCallback(
    (_: MouseEvent, node: RFNode<ReactFlowNodeData>) => {
      switch (node.type) {
        case 'comment':
          changeViewportAction(ViewPortAction.Comment)
          break
        case 'speech_ballon':
          changeViewportAction(ViewPortAction.SpeechBallon)
          break
        default:
          break
      }
    },
    [changeViewportAction],
  )

  const handleNodeDragStop = useCallback(
    (_: MouseEvent, node: RFNode<ReactFlowNodeData>) => {
      const data = {
        id: node.id,
        x: node.position.x,
        y: node.position.y,
      }

      const nodeById = getNodeById(node.id)

      if (
        (nodeById?.data.x === data.x && nodeById?.data.y === data.y) ||
        (isSpeechBallonData(node.data) && !node.data.is_saved)
      ) {
        return
      }

      switch (node.type) {
        case 'comment':
          updateCommentNode(data)
          break
        case 'speech_ballon':
          updateSpeechBallonNode(data)
          break
        default:
          break
      }
    },
    [getNodeById, updateCommentNode, updateSpeechBallonNode],
  )

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()

      const isSpeechBallonPane = viewportAction === ViewPortAction.SpeechBallon
      const isPaneClick = (e.target as HTMLElement).className === PANE_CLASS_NAME

      if (isPaneClick && isSpeechBallonPane) {
        setActivePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
    },
    [setActivePosition, viewportAction],
  )

  return {
    handleWheel,
    handleNodesChange,
    handleEdgesChange,
    handlePaneClick,
    handleNodesDelete,
    handleNodeClick,
    handleNodeDragStart,
    handleNodeDragStop,
    handleContextMenu,
  }
}
