import { Node as PNode } from '@prisma/client'
import { HierarchyNode } from 'd3-hierarchy'
import { Node } from 'reactflow'

export type FlowNode = PNode

export type RootNode = FlowNode & {
  children: RootNode[]
}

export type ReactFlowNode = Node<FlowNode>

export type HierarchyFlowNode = HierarchyNode<ReactFlowNode>
