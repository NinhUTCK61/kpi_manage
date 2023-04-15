import { ReactFlowNode } from '../types'

export const _nodes: ReactFlowNode[] = [
  {
    id: 'root',
    data: {
      id: 'root',
      slug: 'root',
      parent_node_id: '',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A',
    data: {
      id: 'A',
      slug: 'A',
      parent_node_id: 'root',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'B',
    data: {
      id: 'B',
      slug: 'B',
      parent_node_id: 'root',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'C',
    data: {
      id: 'C',
      slug: 'C',
      parent_node_id: 'root',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A1',
    data: {
      id: 'A1',
      slug: 'A1',
      parent_node_id: 'A',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A2',
    data: {
      id: 'A2',
      slug: 'A2',
      parent_node_id: 'A',
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'A3',
    data: {
      id: 'A3',
      slug: 'A3',
      parent_node_id: 'A',
    },
    position: { x: 0, y: 0 },
  },
]
