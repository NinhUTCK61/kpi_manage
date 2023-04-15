import { Edge } from 'reactflow'
import { afterEach, describe, expect, test } from 'vitest'
import { flattenHierarchy, generateNextReactFlowNode, stratifier } from '../core'
import { DbNode, ReactFlowNode } from '../types'
import { _edges, _nodes } from './__mock__'

// This is data from API
const rootNode: DbNode = {
  id: 'root',
  slug: 'root',
  parent_node_id: '',
  children: [],
}

// const d3Root = createD3Hierarchy(rootNode)

const nodes: ReactFlowNode[] = _nodes
const edges: Edge[] = _edges
const d3Root = stratifier(nodes)

describe('Node Hierarchy', () => {
  afterEach(() => {
    console.log('nodes', nodes)
    console.log('edges', edges)
  })

  test('Convert api data to react flow node', () => {
    const { nodes: parseNodes } = flattenHierarchy(rootNode)

    expect(parseNodes[0]?.id).toBe('root')
  })

  test('Add new node to root node', () => {
    // Add two node B, C
    for (let index = 0; index < 2; index++) {
      const { node, edge } = generateNextReactFlowNode(d3Root.data.id, d3Root)
      nodes.push(node)
      edges.push(edge)
    }
  })

  test('Add new node to B, B node', () => {
    // Add node B1
    const parentNodeId = 'B'
    const { node, edge } = generateNextReactFlowNode(parentNodeId, d3Root)
    nodes.push(node)
    edges.push(edge)
    expect(node.id).toBe('B1')

    // Add two node to A
    for (let index = 0; index < 2; index++) {
      const { node, edge } = generateNextReactFlowNode('A', d3Root)
      nodes.push(node)
      edges.push(edge)
    }
  })

  test('Add new node to B1 node', () => {
    // Add node B1
    const parentNodeId = 'B1'
    for (let index = 0; index < 2; index++) {
      const { node, edge } = generateNextReactFlowNode(parentNodeId, d3Root)
      nodes.push(node)
      edges.push(edge)
      expect(node.id).toBe(`${parentNodeId}${index + 1}`)
    }
  })

  test('Removing and re-adding child nodes', () => {
    // remove middle node
  })
})
