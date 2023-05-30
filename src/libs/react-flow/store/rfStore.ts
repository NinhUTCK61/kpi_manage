import { ViewPortAction } from '@/features/node/constant'
import { CommentReplyOutputType } from '@/libs/schema/comment'
import { hierarchy } from 'd3-hierarchy'
import { produce } from 'immer'
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
import {
  generateNextReactFlowNode,
  isEmptyKPINodeForm,
  reLayout,
  removeEdgeByNodeId as rmEdges,
} from '../helper'
import {
  RFStore,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  ReactFlowSpeechBallonNode,
} from '../types'
import { d3RootMiddleware } from './middleware'

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
  stroke: 1,
  shape: '1',
  zoom: 0.75,
  nodeFocused: null,
  activePosition: null,
  container: null,
}

const createRFStore = (initialState?: Partial<RFStore>) =>
  createStore<RFStore>(
    d3RootMiddleware((set, get) => ({
      ...(DEFAULT_STATE as RFStore),
      ...initialState,
      handleNodesChange(changes: NodeChange[]) {
        if (changes[0]?.type === 'remove') {
          // remove node handle by onNodesDelete
          return
        }

        set({
          nodes: applyNodeChanges<ReactFlowNode['data']>(changes, get().nodes) as ReactFlowNode[],
        })
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
        nodes.push(node)
        edges.push(edge)

        const _nodes = reLayout(nodes)
        // TODO: update node position after re-layout
        const _newNode = _nodes.find((n) => n.id === node.id) as ReactFlowKPINode

        get().setNodeFocused(node.data.id)

        set({
          nodes: _nodes,
          edges: [...edges],
        })

        return _newNode
      },
      deleteNodes(nodes) {
        console.log('onNodesDelete', nodes)
      },
      // TODO: update kpi node
      updateKPINode(kpiNodeData, shouldFocus = false) {
        const _nodes = get().nodes

        const node = _nodes.find((n) => n.type === 'kpi' && n.data.id === kpiNodeData.id)
        if (node) {
          node.data = { ...node.data, ...kpiNodeData }
          const nodes = reLayout(_nodes)

          if (shouldFocus) {
            set({ nodes, nodeFocused: node })
            return
          }

          set({ nodes })
        }
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
        set({ nodes: newNodes, edges: filteredEdges })

        return { nodes: newNodes, edges: filteredEdges }
      },
      removeEdgeByNodeId(nodeId) {
        const oldEdges = get().edges
        const edges = rmEdges(oldEdges, nodeId)
        set({ edges })
        return edges
      },
      removeEmptyNode() {
        const oldNodes = get().nodes
        const oldEdges = get().edges
        const emptyNode = oldNodes.find((n) => n.type === 'kpi' && isEmptyKPINodeForm(n.data))
        if (!emptyNode) return

        const _nodes = oldNodes.filter((node) => node.id !== emptyNode?.id)
        const nodes = reLayout(_nodes)
        const edges = rmEdges(oldEdges, emptyNode.id)

        set({ nodes, edges })
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
          get().removeEmptyNode()
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
      findNodeBySlug(slug) {
        const nodes = get().d3Root
        const node = nodes.find((n) => n.data.type === 'kpi' && n.data.data.slug === slug)
        return !!node
      },
      //function toolbar
      changeViewportAction(action) {
        if (action === get().viewportAction) return

        set({
          viewportAction: action,
          nodeFocused: null,
        })
      },
      changeShapeStroke(stroke) {
        set({ stroke })
      },
      changeShapeType(shape) {
        set({ shape })
      },
      // comment node
      addComment(node) {
        const _nodes = get().nodes
        const nodes = [..._nodes, node]
        set({ nodes })
      },
      removeComment(commentId: string) {
        const _nodes = get().nodes
        const nodes = _nodes.filter((comment) => comment.id !== commentId)
        set({ nodes })
      },
      updateComment(commentNode) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const comment = draft.find<ReactFlowCommentNode>(
            (el): el is ReactFlowCommentNode => el.type === 'comment' && el.id === commentNode.id,
          )

          if (comment) comment.data = { ...comment.data, ...commentNode }
        })

        set({ nodes })
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

        set({ nodes })
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

        set({ nodes })
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

        set({ nodes })
      },
      // speech ballon node
      addSpeechBallon(speechBallonNode) {
        get().removeEmptySpeechBallon()
        const nodes = get().nodes
        nodes.push(speechBallonNode)

        set({ nodes: [...nodes] })
      },
      removeEmptySpeechBallon() {
        const _nodes = get().nodes
        const empty = _nodes.find((n) => n.type === 'speech_ballon' && !n.data.text)
        if (!empty) return
        const nodes = _nodes.filter((n) => n.id !== empty.id)
        set({ nodes })
      },
      removeSpeechBallon(speechBallonId: string) {
        const _nodes = get().nodes
        const nodes = _nodes.filter((speechBallon) => speechBallon.id !== speechBallonId)
        set({ nodes })
      },
      updateSpeechBallon(node) {
        const _nodes = get().nodes

        const nodes = produce(_nodes, (draft) => {
          const speechBallon = draft.find<ReactFlowSpeechBallonNode>(
            (el): el is ReactFlowSpeechBallonNode =>
              el.type === 'speech_ballon' && el.id === node.id,
          )

          if (speechBallon) {
            speechBallon.data = {
              ...speechBallon.data,
              ...node,
            }
          }
        })

        set({ nodes: nodes })
      },
      //function zoom
      handleZoom(isZoomIn) {
        const zoomValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
        const currentZoom = get().zoom
        const index = zoomValues.indexOf(currentZoom)
        const newIndex = isZoomIn ? index + 1 : index - 1

        if (newIndex < 0 || newIndex >= zoomValues.length) {
          return
        }

        const newZoom = zoomValues[newIndex]
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
    })),
  )

export { createRFStore }
