import { Edge, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { HierarchyFlowNode, ReactFlowNode } from './node'

export type RFStore = {
  nodes: ReactFlowNode[]
  edges: Edge[]
  d3Root: HierarchyFlowNode
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addNode: (parentId: string) => ReactFlowNode[]
}
