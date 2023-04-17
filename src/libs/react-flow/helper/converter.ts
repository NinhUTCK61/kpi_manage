import { stratify } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import { DbNode, HierarchyFlowNode, ReactFlowNode } from '../types'

export function flattenHierarchy(rootNode: DbNode): { nodes: ReactFlowNode[]; edges: Edge[] } {
  const nodes: ReactFlowNode[] = []
  const edges: Edge[] = []

  function traverse(node: DbNode, parent?: DbNode): void {
    // Thêm node hiện tại vào mảng kết quả
    nodes.push({
      id: node.id,
      data: {
        parent_node_id: '',
        id: node.id,
        slug: node.slug,
        x: 0,
        y: 0,
      },
      position: { x: 0, y: 0 },
      // Thêm các trường dữ liệu khác mà ReactFlow cần
    })

    // Thêm cạnh nếu node hiện tại có cha
    if (parent) {
      edges.push({
        id: `${parent.id}-${node.id}`,
        source: parent.id,
        target: node.id,
        // Thêm các trường dữ liệu khác mà ReactFlow cần
      })
    }

    // Duyệt qua tất cả các node con và thực hiện đệ quy
    if (node.children) {
      for (const child of node.children) {
        traverse(child, node)
      }
    }
  }

  // Bắt đầu duyệt từ rootNode
  traverse(rootNode)

  return { nodes, edges }
}

export function stratifier(nodes: ReactFlowNode[]): HierarchyFlowNode {
  const fn = stratify<ReactFlowNode>()
    .id((d) => d.data.id)
    .parentId((d) => d.data.parent_node_id)

  const d3Root = fn(nodes)
  return d3Root
}
