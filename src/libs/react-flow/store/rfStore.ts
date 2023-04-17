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
import { RFStore, ReactFlowNode } from '../types'
import { d3RootMiddleware } from './middleware'

const initialRootNode: ReactFlowNode = {
  id: 'root',
  data: {
    slug: 'root',
    parent_node_id: '',
    id: '',
    x: 0,
    y: 0,
  },
  position: { x: 0, y: 0 },
}

const DEFAULT_STATE: Partial<RFStore> = {
  nodes: [],
  edges: [],
  d3Root: hierarchy(initialRootNode),
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
        const d3Root = get().d3Root
        const nodes = get().nodes
        const edges = get().edges
        const { node, edge } = generateNextReactFlowNode(parentNodeId, d3Root)
        nodes.push(node)
        edges.push(edge)

        const _d3 = stratifier(nodes)

        const _node = getLayoutElements(_d3)

        set({
          nodes: [..._node],
          edges: [...edges],
        })
      },
    })),
  )

export { createRFStore }
