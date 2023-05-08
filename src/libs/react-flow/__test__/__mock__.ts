import { Edge } from 'reactflow'
import { ReactFlowKPINode } from '../types'

export const _nodes: ReactFlowKPINode[] = [
  {
    id: 'root',
    data: {
      id: 'root',
      slug: 'root',
      parent_node_id: '',
      x: 0,
      y: 0,
      input_title: 'root',
      input_value: '',
      is_formula: false,
      node_style: null,
      unit: '',
      value2number: 0,
      template_id: 'root',
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
      input_title: 'root',
      input_value: '',
      is_formula: false,
      node_style: null,
      unit: '',
      value2number: 0,
      template_id: 'root',
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
      input_title: 'root',
      input_value: '',
      is_formula: false,
      node_style: null,
      unit: '',
      value2number: 0,
      template_id: 'root',
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
