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
import { generateNextReactFlowNode, getLayoutElements, stratifier } from '../helper'
import { RFStore, ReactFlowKPINode } from '../types'
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
    type: 'kpi',
  },
  position: { x: 0, y: 0 },
  type: 'kpi',
}

const DEFAULT_STATE: Partial<RFStore> = {
  nodes: [],
  edges: [],
  d3Root: hierarchy(initialRootNode),
  viewportAction: ViewPortAction.Move,
  nodeFocused: 'root',
  fontSize: '12',
  nodeColor: '#1A74EE',
  colorShape: '#3E19A3',
  stroke: 1,
  shape: '1',
}

const createRFStore = (initialState?: Partial<RFStore>) =>
  createStore<RFStore>(
    d3RootMiddleware((set, get) => ({
      ...(DEFAULT_STATE as RFStore),
      ...initialState,
      onNodesChange(changes: NodeChange[]) {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        })
      },
      onEdgesChange(changes: EdgeChange[]) {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        })
      },
      onConnect(connection: Connection) {
        set({
          edges: addEdge(connection, get().edges),
        })
      },
      addNode(parentNodeId: string) {
        const _d3 = get().d3Root

        const nodes = get().nodes
        const edges = get().edges
        const { node, edge } = generateNextReactFlowNode(parentNodeId, _d3)
        const _node = node
        _node.data = {
          ..._node.data,
          node_style: JSON.stringify({
            fontSize: get().fontSize,
            color: get().nodeColor,
          }),
        }
        nodes.push(_node)
        edges.push(edge)

        const d3Updated = stratifier(nodes)
        const _nodes = getLayoutElements(d3Updated)

        const _newNode = _nodes.find((n) => n.id === node.id)

        get().setNodeFocused(node.data.slug)

        set({
          nodes: _nodes,
          edges: [...edges],
        })

        return _nodes
      },
      removeNodeNull() {
        const _d3 = get().nodes
        const nodes = get().nodes

        const nodeNull = _d3.find((n) => n.data.type === 'kpi' && !n.data.input_title)
        const _nodes = nodes.filter((node) => node.id !== nodeNull?.id)
        const d3Updated = stratifier(_nodes)
        const nodeFilter = getLayoutElements(d3Updated)
        set({ nodes: nodeFilter })
      },
      changeViewportAction(action) {
        set({
          viewportAction: action,
          nodeFocused: '',
        })
      },
      setNodeFocused(nodeSlug) {
        set({
          nodeFocused: nodeSlug,
        })
      },
      onNodeClick(_, node) {
        set({
          nodeFocused: node.data.slug,
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
      isHasChild(nodeId: string) {
        const _d3 = get().d3Root
        const _node = _d3.find((n) => n.data.id === nodeId)
        return !!_node?.children?.length
      },
      updateNode(nodeSlug, data) {
        const _d3 = get().d3Root
        const _node = _d3.find((n) => n.data.data.slug === nodeSlug)
        if (_node) {
          _node.data.data = { ..._node.data.data, ...data }
          const _nodes = getLayoutElements(_d3)
          set({ nodes: _nodes })
        }
      },
    })),
  )

export { createRFStore }
