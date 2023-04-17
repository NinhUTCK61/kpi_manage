import { Edge } from 'reactflow'
import { ReactFlowNode } from '../types'

export const _nodes: ReactFlowNode[] = [
  {
    id: 'root',
    data: {
      id: 'root',
      slug: 'root',
      parent_node_id: '',
      x: 0,
      y: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A',
    data: {
      id: 'A',
      slug: 'A',
      parent_node_id: 'root',
      x: 0,
      y: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A1',
    data: {
      id: 'A1',
      slug: 'A1',
      parent_node_id: 'A',
      x: 0,
      y: 0,
    },
    position: { x: 0, y: 0 },
  },
]

export const _edges: Edge[] = [
  {
    id: 'root-A',
    source: 'root',
    target: 'A',
  },
  {
    id: 'A-A1',
    source: 'A',
    target: 'A1',
  },
]
