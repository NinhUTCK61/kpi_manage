import { ViewPortAction } from '@/features/node/constant'
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
import {
  generateNextReactFlowNode,
  isEmptyKPINodeForm,
  reLayout,
  removeEdgeByNodeId as rmEdges,
} from '../helper'
import { RFStore, ReactFlowCommentNode, ReactFlowKPINode, ReactFlowNode } from '../types'
import { d3RootMiddleware } from './middleware'

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

        get().setNodeFocused(node)

        set({
          nodes: _nodes,
          edges: [...edges],
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
      removeEmptyKPINode() {
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
      //function toolbar
      changeViewportAction(action) {
        if (action === get().viewportAction) return
        get().removeEmptyNode()

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
      // FIXME: remove empty node
      removeEmptyNode() {
        const _nodes = get().nodes

        const nodes = _nodes.filter((node) => {
          if (node.type === 'comment') {
            return node.data.content !== ''
          }

          if (node.type === 'speech_ballon') {
            return node.data.text !== ''
          }

          if (node.type === 'kpi') {
            return !isEmptyKPINodeForm(node.data)
          }

          return true
        })

        set({ nodes })
      },
      // speech ballon node
      addSpeechBallon(speechBallonNode, shouldFocus) {
        get().removeEmptySpeechBallon()
        const nodes = get().nodes
        nodes.push(speechBallonNode)

        if (shouldFocus) {
          set({ nodes: [...nodes], nodeFocused: speechBallonNode })

          return
        }

        set({ nodes: [...nodes] })
      },
      removeEmptySpeechBallon() {
        const _nodes = get().nodes
        const empty = _nodes.find((n) => n.type === 'speech_ballon' && !n.data.text)
        if (!empty) return
        const nodes = _nodes.filter((n) => n.id !== empty.id)
        set({ nodes })
      },
      removeSpeechBallon(speechBallonId) {
        const _nodes = get().nodes
        const nodes = _nodes.filter((speechBallon) => speechBallon.id !== speechBallonId)
        set({ nodes })
      },
      updateSpeechBallon(speechBallonData, shouldFocus) {
        const _nodes = get().nodes

        const node = _nodes.find(
          (n) => n.type === 'speech_ballon' && n.data.id === speechBallonData.id,
        )
        if (node) {
          node.data = { ...node.data, ...speechBallonData }

          const nodes = _nodes.map((el) => {
            return el.id === node.id ? node : el
          })

          if (shouldFocus) {
            set({ nodes, nodeFocused: { ...node } })
            return
          }
          set({ nodes })
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
    })),
  )

export { createRFStore }
