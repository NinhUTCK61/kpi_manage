import { CommentWithAuthorType, CreateCommentOutputType } from '@/libs/schema/comment'
import {
  ReactFlowCommentNodeOutputType,
  ReactFlowKPINodeOutputType,
  ReactFlowOutputEdge,
  ReactFlowSpeechBallonNodeOutputType,
} from '@/libs/schema/node'
import { SpeechBallon } from '@prisma/client'
import { HierarchyNode, stratify } from 'd3-hierarchy'
import { Edge as ReactFlowEdge } from 'reactflow'
import {
  HierarchyFlowNode,
  KPINodeType,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  RootNode,
} from '../types'

export function flattenHierarchy(rootNode: RootNode): {
  nodes: ReactFlowNode[]
  edges: ReactFlowEdge[]
} {
  const nodes: ReactFlowNode[] = []
  const edges: ReactFlowEdge[] = []

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

// Convert d3-hierarchy nodes to reactflow nodes
export const convertToReactFlowKPINodes = (
  hierarchyNode: HierarchyNode<KPINodeType>,
): ReactFlowKPINodeOutputType[] => {
  const descendants = hierarchyNode.descendants()

  return descendants.map((node) => {
    return {
      id: node.data.id,
      data: {
        parent_node_id: node.data.parent_node_id,
        id: node.data.id,
        slug: node.data.slug,
        x: node.data.x,
        y: node.data.y,
        input_title: node.data.input_title,
        input_value: node.data.input_value,
        value2number: node.data.value2number,
        node_style: node.data.node_style,
        is_formula: node.data.is_formula,
        unit: node.data.unit,
        template_id: node.data.template_id,
        type: 'kpi',
      },
      position: { x: node.data.x, y: node.data.y },
      type: 'kpi',
      draggable: false,
    }
  })
}

// Convert d3-hierarchy links to reactflow edges
export const convertToReactFlowEdges = (
  hierarchyNode: HierarchyNode<KPINodeType>,
): ReactFlowOutputEdge[] => {
  const links = hierarchyNode.links()

  return links.map((link) => {
    return {
      id: `${link.source.data.slug}-${link.target.data.slug}`,
      source: link.source.data.id,
      target: link.target.data.id,
      animated: false,
      type: 'kpi',
    }
  })
}

export const convertToReactFlowSpeechBallon = (
  speechBallon: SpeechBallon[],
): ReactFlowSpeechBallonNodeOutputType[] => {
  return speechBallon.map((sb) => {
    return {
      id: sb.id,
      data: sb,
      position: { x: sb.x, y: sb.y },
      type: 'speech_ballon',
    }
  })
}

export const convertToReactFlowComments = (
  comments: CommentWithAuthorType[],
): ReactFlowCommentNodeOutputType[] => {
  return comments.map((comment) => {
    return {
      id: comment.id,
      data: comment,
      position: { x: comment.x, y: comment.y },
      type: 'comment',
    }
  })
}

export const convertToReactFlowComment = (
  comment: CreateCommentOutputType,
): ReactFlowCommentNode => {
  return {
    id: comment.id,
    data: {
      ...comment,
      replies: [],
    },
    position: { x: comment.x, y: comment.y },
    type: 'comment',
  }
}
