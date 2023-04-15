import { HierarchyNode } from 'd3-hierarchy'
import { Node } from 'reactflow'

export type DbNode = {
  id: string
  slug: string
  parent_node_id: string
  children: DbNode[]
}

export type FlowNode = {
  id: string
  slug: string
  parent_node_id: string
}

export type ReactFlowNode = Node<FlowNode>

export type HierarchyFlowNode = HierarchyNode<FlowNode>
