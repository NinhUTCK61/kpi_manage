import { afterEach, describe, expect, test } from 'vitest'
import { flattenHierarchy, generateNextReactFlowNode, stratifier } from '../core'
import { DbNode, ReactFlowNode } from '../types'
import { _nodes } from './__mock__'

// This is data from API
const rootNode: DbNode = {
  id: 'root',
  slug: 'root',
  parent_node_id: '',
  children: [],
}

// const d3Root = createD3Hierarchy(rootNode)

const nodes: ReactFlowNode[] = _nodes

describe('Node Hierarchy', () => {
  afterEach(() => {
    console.log('nodes', nodes)
  })

  test('Convert api data to react flow node', () => {
    const { nodes: parseNodes } = flattenHierarchy(rootNode)

    expect(parseNodes[0]?.id).toBe('root')
  })

  test('Add new node to root node', () => {
    // const newNode: FlowNode = { id: 'A', children: [], slug: 'A', parent_node_id: 'root' }
    // nodes.push({
    //   id: newNode.id,
    //   data: newNode,
    //   type: 'default',
    //   position: { x: 0, y: 0 },
    // })
    // rootNode.children.push(newNode)

    const d3Root = stratifier(nodes)
    console.log('d3Root', JSON.stringify(d3Root.toString(), null, 2))
    // const newNode = generateNextReactFlowNode(d3Root.data.id, d3Root)
    // nodes.push(newNode)
    // Add three node A, B, C
    for (let index = 0; index < 3; index++) {
      const newNode = generateNextReactFlowNode(d3Root.data.id, d3Root)
      nodes.push(newNode)
    }
  })

  // test('Removing and re-adding child nodes', () => {
  //   // Xóa node A1
  //   d3Root.children[0].children = []
  //   // Đồng bộ hóa dữ liệu giữa d3Root và rootNode
  //   rootNode.children[0].children = d3Root.children[0].children.map((d) => d.data)
  //   expect(rootNode.children[0].children.length).toEqual(0)

  //   // Thêm lại node A1
  //   const newNodeA1: FlowNode = { id: generateNextId(d3Root.children[0]), children: [] }
  //   d3Root.children[0].children = [hierarchy(newNodeA1, (d) => d.children)]
  //   // Đồng bộ hóa dữ liệu giữa d3Root và rootNode
  //   rootNode.children[0].children = d3Root.children[0].children.map((d) => d.data)
  //   expect(rootNode.children[0].children[0].id).toEqual('A1')
  // })
})
