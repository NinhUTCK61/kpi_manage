import { ViewPortAction } from '@/features/node/constant'
import { hierarchy } from 'd3-hierarchy'
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
  getLayoutElements,
  isEmptyKPINodeForm,
  removeEdgeByNodeId as rmEdges,
  stratifier,
} from '../helper'
import { RFStore, ReactFlowKPINode, ReactFlowNode } from '../types'
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
  },
  position: { x: 0, y: 0 },
  type: 'kpi',
}

const DEFAULT_STATE: Partial<RFStore> = {
  nodes: [],
  edges: [],
  d3Root: hierarchy(initialRootNode),
  viewportAction: ViewPortAction.Move,
  fontSize: '12',
  nodeColor: '#000000',
  colorShape: '#3E19A3',
  stroke: 1,
  shape: '1',
  zoom: 0.75,
  nodeFocused: null,
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

        const d3Updated = stratifier(nodes)

        const _nodes = getLayoutElements(d3Updated)
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
      updateKPINode(kpiNodeData) {
        const _d3 = get().d3Root
        const _node = _d3.find((n) => n.data.data.id === kpiNodeData.id)
        if (_node) {
          _node.data.data = { ..._node.data.data, ...kpiNodeData }
          const _nodes = getLayoutElements(_d3)

          set({ nodes: _nodes })
        }
      },
      removeNode(nodeId: string) {
        let oldNodes = get().nodes
        let oldEdges = get().edges
        const d3Node = get().d3Root.find((n) => n.data.id === nodeId)

        if (!d3Node) return { nodes: oldNodes, edges: oldEdges }

        // remove children node
        d3Node.descendants().forEach((n) => {
          const _node = oldNodes.find((node) => node.id === n.data.id)

          if (_node) {
            oldNodes = oldNodes.filter((node) => node.id !== n.data.id)
            oldEdges = oldEdges.filter(
              (edge) => edge.source !== n.data.id && edge.target !== n.data.id,
            )
          }
        })

        const nodes = oldNodes.filter((n) => n.id !== nodeId)
        const edges = rmEdges(oldEdges, nodeId)

        const d3Updated = stratifier(nodes)
        const _nodes = getLayoutElements(d3Updated)
        set({ nodes: _nodes, edges })

        return { nodes: _nodes, edges }
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
        const d3Updated = stratifier(_nodes)
        const nodes = getLayoutElements(d3Updated)
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

        set({
          nodeFocused,
        })

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
      //function toolbar
      changeViewportAction(action) {
        set({
          viewportAction: action,
        })
      },
      changeFontSize(fontSize) {
        set({
          fontSize,
        })
      },
      changeNodeColor(nodeColor) {
        set({
          nodeColor,
        })
      },
      changeShapeColor(colorShape) {
        set({
          colorShape,
        })
      },
      changeShapeStroke(stroke) {
        set({ stroke })
      },
      changeShapeType(shape) {
        set({ shape })
      },
      //function zoom
      handleZoom(isZoomIn) {
        const list_value_zoom = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

        let _zoomValue = get().zoom

        for (
          let i = isZoomIn ? 0 : list_value_zoom.length - 1;
          isZoomIn ? i < list_value_zoom.length : i >= 0;
          isZoomIn ? i++ : i--
        ) {
          const value = list_value_zoom[i]
          if (!value) return
          if (isZoomIn) {
            if (value > _zoomValue) {
              _zoomValue = value
              break
            }
          } else {
            if (value < _zoomValue) {
              _zoomValue = value
              break
            }
          }
        }

        set({ zoom: _zoomValue })
      },
      scrollZoom(isZoomIn) {
        const _zoom = get().zoom * 100
        if (isZoomIn) {
          set({ zoom: (_zoom <= 200 ? _zoom + 5 : _zoom) / 100 })
        } else {
          set({ zoom: (_zoom >= 10 ? _zoom - 5 : _zoom) / 100 })
        }
      },
    })),
  )

export { createRFStore }
