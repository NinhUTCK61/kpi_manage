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
import { generateNextReactFlowNode } from '../helper'
import { FlowNode, RFStore } from '../types'

const initialRootNode: FlowNode = {
  slug: 'root',
  parent_node_id: '',
  id: '',
}

const DEFAULT_STATE: Partial<RFStore> = {
  nodes: [],
  edges: [],
  d3Root: hierarchy(initialRootNode),
}

const createRFStore = (initialState?: Partial<RFStore>) =>
  createStore<RFStore>((set, get) => ({
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

      set({
        nodes: [...nodes],
        edges: [...edges],
        d3Root,
      })
    },
  }))

export { createRFStore }
