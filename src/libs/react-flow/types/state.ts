import { ViewPortAction } from '@/features/node/constant'
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { HierarchyFlowNode, KPINodeType, ReactFlowKPINode, ReactFlowNode } from './node'

export type RFStore = {
  templateId: string
  nodes: ReactFlowNode[]
  edges: Edge[]
  d3Root: HierarchyFlowNode
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addKPINode: (parentId: string) => ReactFlowKPINode
  nodeFocused: string | null
  onNodeClick: (e: React.MouseEvent, n: Node<KPINodeType>) => void
  setNodeFocused: (slug: string) => void
  isHasChild(nodeId: string): boolean
  removeEmptyNode: () => void
  updateKPINode: (node: KPINodeType) => void
  removeNode: (nodeId: string) => void
  removeEdgeByNodeId: (nodeId: string) => Edge[]
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
