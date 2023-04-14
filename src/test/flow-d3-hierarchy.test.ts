import {
  NodeFlow,
  createD3Hierarchy,
  generateIds,
  generateNextId,
} from '@/libs/utils/dfs-d3-hierarchy'

describe('Node Hierarchy', () => {
  test('Add child nodes to a single root node', () => {
    const rootNode: NodeFlow = {
      id: 'root',
      children: [],
    }

    const d3Root = createD3Hierarchy(rootNode)
    rootNode.children.push({ id: generateNextId(rootNode), children: [] })
    rootNode.children.push({ id: generateNextId(rootNode), children: [] })

    generateIds(d3Root)

    expect(d3Root.children![0].data.id).toBe('A')
    expect(d3Root.children![1].data.id).toBe('B')
  })

  test('Remove a node and add a new node with the same id', () => {
    const rootNode: NodeFlow = {
      id: 'root',
      children: [
        {
          id: 'A',
          children: [
            { id: 'A1', children: [] },
            { id: 'A2', children: [] },
          ],
        },
      ],
    }

    const d3Root = createD3Hierarchy(rootNode)
    const nodeA = d3Root.children![0]

    // Remove the node A1
    nodeA.children = nodeA.children!.filter((child) => child.data.id !== 'A1')

    // Add a new child node to node A
    nodeA.data.children!.push({ id: '', children: [] })

    // Generate the ids
    generateIds(d3Root)

    // Check if the new node has the same id as the removed node
    expect(nodeA.children![1].data.id).toBe('A1')
  })

  // Add more test cases for other scenarios like copy, ...
})
