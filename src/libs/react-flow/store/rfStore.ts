import { ViewPortAction } from '@/features/node/constant'
import { ReactFlowNode } from '@/libs/react-flow'
import { CommentReplyOutputType } from '@/libs/schema/comment'
import { hierarchy } from 'd3-hierarchy'
import { produce, setAutoFreeze } from 'immer'
import { cloneDeep } from 'lodash'
import {
  Connection,
  EdgeChange,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import { createStore } from 'zustand'

import { pxToNumber } from '@/libs/utils/misc'
import {
  generateNextReactFlowNode,
  isEmptyKPINodeForm,
  reLayout,
  removeEdgeByNodeId as rmEdges,
} from '../helper'
import { RFStore, ReactFlowCommentNode, ReactFlowKPINode } from '../types'
import { UpdateStateReason, kpiMiddleware } from './middleware'

setAutoFreeze(false)

const initialRootNode: ReactFlowKPINode = {
  id: 'root',
  data: {
    slug: 'root',
    parent_node_id: '',
    id: '',
    x: 0,
    y: 0,
    input_title: '',
    input_value: '',
    is_formula: false,
    node_style: null,
    unit: '',
    value2number: 0,
    template_id: '',
    is_saved: true,
  },
  position: { x: 0, y: 0 },
  type: 'kpi',
}

const DEFAULT_STATE: Partial<RFStore> = {
  nodes: [],
  edges: [],
  d3Root: hierarchy(initialRootNode),
  viewportAction: ViewPortAction.Move,
  zoom: 0.75,
  nodeFocused: null,
  activePosition: null,
  container: null,
}

const createRFStore = (initialState?: Partial<RFStore>) =>
  createStore<RFStore>(
    kpiMiddleware((set, get) => ({
      ...(DEFAULT_STATE as RFStore),
      ...initialState,
      handleNodesChange(changes: NodeChange[]) {
        if (changes[0]?.type === 'remove') {
          // remove node handle by onNodesDelete
          return
        }

        set({
          nodes: applyNodeChanges<ReactFlowNode['data']>(changes, get().nodes) as ReactFlowNode[],
          updateStateReason: UpdateStateReason.NodesChangeByReactFlow,
        })

        // console.log(`==========apply node change by ${changes[0]?.type}==========`)
      },
      handleEdgesChange(changes: EdgeChange[]) {
        if (changes[0]?.type === 'remove') {
          // remove node handle by onNodesDelete
          return
        }

        set({
          edges: applyEdgeChanges(changes, get().edges),
        })
      },
      onConnect(connection: Connection) {
        set({
          edges: addEdge(connection, get().edges),
        })
      },
      addKPINode(parentNodeId: string) {
        const _d3 = get().d3Root

        const nodes = get().nodes
        const edges = get().edges
        const { node, edge } = generateNextReactFlowNode(parentNodeId, _d3)
        const _nodes = reLayout([...nodes, node])

        const _newNode = _nodes.find((n) => n.id === node.id) as ReactFlowKPINode

        get().setNodeFocused(node)

        set({
          nodes: _nodes,
          edges: [...edges, edge],
          updateStateReason: UpdateStateReason.AddKPINode,
        })

        return _newNode
      },
      deleteNodes(nodes) {
        console.log('onNodesDelete', nodes)
      },
      getNodeById(id) {
        return get().nodes.find((n) => n.id === id) || null
      },
      // TODO: update kpi node
      updateKPINode(kpiNodeData, shouldFocus = false) {
        const _nodes = get().nodes
        const nodeIndex = _nodes.findIndex((n) => n.type === 'kpi' && n.data.id === kpiNodeData.id)
        if (nodeIndex !== -1) {
          const node = _nodes[nodeIndex] as ReactFlowNode

          const nodeUpdate = produce(node, (draft) => {
            draft.data = { ...draft.data, ...kpiNodeData }
          })
          const nodesUpdated = produce(_nodes, (draft) => {
            draft[nodeIndex] = nodeUpdate
          })

          const nodes = reLayout(nodesUpdated)

          if (shouldFocus) {
            set({
              nodes,
              nodeFocused: nodeUpdate,
              updateStateReason: UpdateStateReason.UpdateKPINode,
            })
            return
          }

          set({ nodes, updateStateReason: UpdateStateReason.UpdateKPINode })
        }
      },
      bulkUpdateKpiNode(nodeUpdates) {
        const _nodes = [...get().nodes]
        const newNodes = produce(_nodes, (draft) => {
          nodeUpdates.forEach((nodeUpdate) => {
            const node = draft.find((n) => n.type === 'kpi' && n.data.id === nodeUpdate.id)
            if (node) node.data = { ...node.data, ...nodeUpdate }
          })
        })
        set({ nodes: newNodes, updateStateReason: UpdateStateReason.BulkUpdateKpiNodes })
      },
      removeNode(nodeId) {
        const { nodes, edges, d3Root } = get()
        const nodeToRemove = d3Root.find((n) => n.data.id === nodeId)

        if (!nodeToRemove) {
          return { nodes, edges }
        }

        const nodesToRemove = nodeToRemove.descendants().map((n) => n.data.id)
        const filteredNodes = nodes.filter((n) => !nodesToRemove.includes(n.id))
        const filteredEdges = edges.filter(
          (e) => !nodesToRemove.includes(e.source) && !nodesToRemove.includes(e.target),
        )

        const newNodes = reLayout(filteredNodes)
        set({
          nodes: newNodes,
          edges: filteredEdges,
          updateStateReason: UpdateStateReason.RemoveNodeById,
        })

        return { nodes: newNodes, edges: filteredEdges }
      },
      removeEdgeByNodeId(nodeId) {
        const oldEdges = get().edges
        const edges = rmEdges(oldEdges, nodeId)
        set({ edges, updateStateReason: UpdateStateReason.RemoveEdge })
        return edges
      },
      removeEmptyKPINode() {
        const oldNodes = get().nodes
        const oldEdges = get().edges
        const emptyNode = oldNodes.find((n) => n.type === 'kpi' && isEmptyKPINodeForm(n.data))
        if (!emptyNode) return

        const _nodes = oldNodes.filter((node) => node.id !== emptyNode?.id)
        const nodes = reLayout(_nodes)
        const edges = rmEdges(oldEdges, emptyNode.id)

        set({ nodes, edges, updateStateReason: UpdateStateReason.RemoveEmptyKPINode })
      },
      getKPINodeById(id) {
        const node = get().nodes.find((n) => n.type === 'kpi' && n.data.id === id)
        if (!node) return null
        return node
      },
      hasChild(nodeId: string) {
        const _d3 = get().d3Root
        const _node = _d3.find((n) => n.data.id === nodeId)
        return !!_node?.children?.length
      },
      setNodeFocused(node) {
        let nodeFocused: ReactFlowNode | null = null
        const nodes = get().nodes
        if (typeof node === 'string') {
          nodeFocused = nodes.find((n) => n.id === node) || null
        } else {
          nodeFocused = node
        }

        set({ nodeFocused })

        if (!node) {
          get().removeEmptyKPINode()
        }
      },
      onNodeClick(_, node) {
        if (node.type === 'kpi') {
          set({
            nodeFocused: node,
          })
        }
      },
      setNodeCopy(node) {
        const nodes = get().nodes
        let nodeCopy: ReactFlowNode | null = null
        nodeCopy = nodes.find((n) => n.id === node) || null
        set({ nodeCopy })
      },
      getKpiNodes() {
        return get().nodes.filter<ReactFlowKPINode>((n): n is ReactFlowKPINode => n.type === 'kpi')
      },
      //function toolbar
      changeViewportAction(action) {
        if (action === get().viewportAction) return
        get().removeEmptyNode()

        set({
          viewportAction: action,
          nodeFocused: null,
        })
      },

      // comment node
      addComment(node) {
        const _nodes = get().nodes
        const nodes = [..._nodes, node]
        set({ nodes, updateStateReason: UpdateStateReason.AddCommentNode })
      },
      removeComment(commentId: string) {
        const _nodes = get().nodes
        const nodes = _nodes.filter((comment) => comment.id !== commentId)
        set({ nodes, updateStateReason: UpdateStateReason.DeleteCommentNode })
      },
      updateComment(commentNode) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const comment = draft.find<ReactFlowCommentNode>(
            (el): el is ReactFlowCommentNode => el.type === 'comment' && el.id === commentNode.id,
          )

          if (comment) comment.data = { ...comment.data, ...commentNode }
        })

        set({ nodes, updateStateReason: UpdateStateReason.UpdateCommentNode })
      },
      addCommentReply(reply, commentReplyIndex) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const comment = draft.find<ReactFlowCommentNode>(
            (el): el is ReactFlowCommentNode => el.type === 'comment' && el.id === reply.comment_id,
          )

          if (commentReplyIndex !== undefined) {
            comment?.data.replies.splice(commentReplyIndex, 0, reply)
          } else {
            comment?.data.replies.push(reply)
          }
        })

        set({ nodes, updateStateReason: UpdateStateReason.AddCommentReply })
      },
      removeCommentReply(reply) {
        const _nodes = get().nodes
        let remove: CommentReplyOutputType | undefined
        let commentReplyIndex: number | undefined

        const nodes = produce(_nodes, (draft) => {
          const comment = draft.find<ReactFlowCommentNode>(
            (el): el is ReactFlowCommentNode => el.type === 'comment' && el.id === reply.comment_id,
          )

          if (comment) {
            commentReplyIndex = comment.data.replies.findIndex((r) => r.id === reply.id)

            if (commentReplyIndex !== -1) {
              const [_remove] = comment.data.replies.splice(commentReplyIndex, 1)
              remove = cloneDeep(_remove)
            }
          }
        })

        set({ nodes, updateStateReason: UpdateStateReason.DeleteCommentReply })
        return { remove, commentReplyIndex }
      },
      updateCommentReply({ id, comment_id, content }) {
        const _nodes = get().nodes
        const nodes = produce(_nodes, (draft) => {
          const comment = draft.find<ReactFlowCommentNode>(
            (el): el is ReactFlowCommentNode => el.type === 'comment' && el.id === comment_id,
          )

          comment?.data.replies.filter((data) => {
            if (data.id === id) {
              data.content = content
            }
          })
        })

        set({ nodes, updateStateReason: UpdateStateReason.UpdateCommentReply })
      },
      removeEmptyNode(ignoreOptions) {
        const _nodes = get().nodes
        const nodeFocused = get().nodeFocused

        const nodes = _nodes.filter((node) => {
          if (ignoreOptions?.ignoreFocusNode && nodeFocused?.id === node.id) return true

          switch (node.type) {
            case 'comment':
              if (ignoreOptions?.ignoreComment) return true
              return node.data.content !== ''
            case 'speech_ballon':
              if (ignoreOptions?.ignoreSpeechBallon) return true
              return node.data.text !== ''
            case 'kpi':
              if (ignoreOptions?.ignoreKpi) return true
              return !isEmptyKPINodeForm(node.data)
            default:
              return true
          }
        })

        const _nodesReLayout = reLayout(nodes)

        set({ nodes: _nodesReLayout, updateStateReason: UpdateStateReason.RemoveEmptyNode })
      },
      // speech ballon node
      addSpeechBallon(speechBallonNode, shouldFocus) {
        get().removeEmptySpeechBallon()
        const nodes = get().nodes

        if (shouldFocus) {
          set({
            nodes: [...nodes, speechBallonNode],
            nodeFocused: speechBallonNode,
            updateStateReason: UpdateStateReason.AddSpeechBallonNode,
          })

          return
        }

        set({
          nodes: [...nodes, speechBallonNode],
          updateStateReason: UpdateStateReason.AddSpeechBallonNode,
        })
      },
      removeEmptySpeechBallon() {
        const _nodes = get().nodes
        const empty = _nodes.find((n) => n.type === 'speech_ballon' && !n.data.text)
        if (!empty) return
        const nodes = _nodes.filter((n) => n.id !== empty.id)
        set({ nodes, updateStateReason: UpdateStateReason.RemoveEmptySpeechBallonNode })
      },
      removeSpeechBallon(speechBallonId) {
        const _nodes = get().nodes
        const nodes = _nodes.filter((speechBallon) => speechBallon.id !== speechBallonId)
        set({ nodes, updateStateReason: UpdateStateReason.DeleteSpeechBallonNode })
      },
      updateSpeechBallon(speechBallonData, shouldFocus, reason) {
        const _nodes = get().nodes

        const nodeIndex = _nodes.findIndex(
          (n) => n.type === 'speech_ballon' && n.data.id === speechBallonData.id,
        )

        if (nodeIndex !== -1) {
          const style = JSON.parse(speechBallonData.node_style || '{}')
          const height = pxToNumber(style.height)
          const width = pxToNumber(style.width)

          const updatedNode = produce(_nodes[nodeIndex] as ReactFlowNode, (draftNode) => {
            if (draftNode) {
              if (height && width) {
                draftNode.style = { ...draftNode.style, height, width }
              }
              draftNode.data = { ...draftNode.data, ...speechBallonData }
            }
          })

          const updatedNodes = produce(_nodes, (draftNodes) => {
            if (draftNodes[nodeIndex]) {
              draftNodes[nodeIndex] = updatedNode as ReactFlowNode
            }
          })

          const updateStateReason = reason ?? UpdateStateReason.UpdateSpeechBallonNodeData

          if (shouldFocus) {
            set({
              nodes: updatedNodes,
              nodeFocused: { ...updatedNode },
              updateStateReason,
            })
          } else {
            set({
              nodes: updatedNodes,
              updateStateReason,
            })
          }
        }
      },
      //function zoom
      handleZoom(isZoomIn) {
        const zoomValues = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
        const currentZoom = get().zoom
        const currentIndex = zoomValues.indexOf(currentZoom)
        let index = currentIndex

        if (index === -1) {
          const _index = zoomValues.findIndex((e) => e > currentZoom)
          index = isZoomIn ? _index : _index - 1
        } else {
          index = isZoomIn ? currentIndex + 1 : currentIndex - 1

          if (index < 0 || index >= zoomValues.length) {
            return
          }
        }
        const newZoom = zoomValues[index]
        set({ zoom: newZoom })
      },
      scrollZoom(isZoomIn) {
        const { zoom } = get()
        const newZoom = isZoomIn ? zoom + 0.05 : zoom - 0.05
        const clampedZoom = Math.min(Math.max(newZoom, 0.1), 2)
        set({ zoom: clampedZoom })
      },
      setZoom(zoom) {
        set({ zoom })
      },
      setActivePosition(activePosition) {
        set({ activePosition })
      },
      setContainer(container) {
        set({ container })
      },
      updateReactFlowNode(node) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const index = draft.findIndex((el) => el.id === node.id)
          if (index !== -1) {
            Object.assign(draft[index] as ReactFlowNode, node)
          }
        })

        set({ nodes })
      },
      toggleDraggable(id, isDraggable) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const index = draft.findIndex((el) => el.id === id)
          if (index !== -1) {
            if (isDraggable !== undefined) {
              ;(draft[index] as ReactFlowNode).draggable = isDraggable
              return
            }
            ;(draft[index] as ReactFlowNode).draggable = !(draft[index] as ReactFlowNode).draggable
          }
        })

        set({ nodes, updateStateReason: UpdateStateReason.ToggleDraggable })
      },
      // DialogDelete
      handleToggleDialogDelete(dialogProps) {
        if (dialogProps) {
          set({ dialogDelete: dialogProps })
          return
        }

        set({
          dialogDelete: null,
        })
      },
    })),
  )

export { createRFStore }
