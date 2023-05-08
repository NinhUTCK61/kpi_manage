import { SpeechBallon } from '@prisma/client'
import { stratify } from 'd3-hierarchy'
import { Edge } from 'reactflow'
import {
  CommentType,
  HierarchyFlowNode,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  ReactFlowSpeechBallonNode,
  RootNode,
} from '../types'

export function flattenHierarchy(rootNode: RootNode): {
  nodes: ReactFlowNode[]
  edges: Edge[]
} {
  const nodes: ReactFlowNode[] = []
  const edges: Edge[] = []

  function traverse(node: RootNode, parent?: RootNode): void {
    // Thêm node hiện tại vào mảng kết quả
    nodes.push({
      id: node.id,
      data: {
        parent_node_id: node.parent_node_id,
        id: node.id,
        slug: node.slug,
        x: node.x,
        y: node.y,
        input_title: node.input_title,
        input_value: node.input_value,
        value2number: node.value2number,
        node_style: node.node_style,
        is_formula: node.is_formula,
        unit: node.unit,
        template_id: node.template_id,
      },
      position: { x: node.x, y: node.y },
      type: 'kpi',
      // Thêm các trường dữ liệu khác mà ReactFlow cần
    })

    // Thêm cạnh nếu node hiện tại có cha
    if (parent) {
      edges.push({
        id: `${parent.slug}-${node.slug}`,
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
  const kpiNodes = nodes.filter((n) => n.type === 'kpi') as ReactFlowKPINode[]

  const fn = stratify<ReactFlowKPINode>()
    .id((d) => d.data.id)
    .parentId((d) => d.data.parent_node_id)

  const d3Root = fn(kpiNodes)
  return d3Root
}

export const convertToReactFlowSpeechBallon = (
  speechBallon: SpeechBallon[],
): ReactFlowSpeechBallonNode[] => {
  return speechBallon.map((sb) => {
    return {
      id: sb.id,
      data: sb,
      position: { x: sb.x, y: sb.y },
      type: 'speech_ballon',
    }
  })
}

export const convertToReactFlowComments = (comments: CommentType[]): ReactFlowCommentNode[] => {
  return comments.map((comment) => {
    return {
      id: comment.id,
      data: comment,
      position: { x: comment.x, y: comment.y },
      type: 'comment',
    }
  })
}
