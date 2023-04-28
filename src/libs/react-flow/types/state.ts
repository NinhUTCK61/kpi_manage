import { ViewPortAction } from '@/features/node/constant'
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
  updateNode: (node: ReactFlowNode) => void
  nodeFocused: string | null
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  // Toolbar action
  viewportAction: ViewPortAction
  changeViewportAction: (action: ViewPortAction) => void
  fontSize: string | null
  changeFontSize: (fontSize: string) => void
  nodeColor: string | null
  changeNodeColor: (color: string) => void
  colorShape: string | null
  changeShapeColor: (color: string) => void
  stroke: number | null
  changeShapeStroke: (stroke: number) => void
  shape: string | null
  changeShapeType: (shape: string) => void
}
