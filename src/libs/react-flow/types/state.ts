import { ViewPortAction } from '@/features/node/constant'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { Edge, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { HierarchyFlowNode, ReactFlowKPINode, ReactFlowNode } from './node'

export type RFStore = {
  templateId: string
  nodes: ReactFlowNode[]
  edges: Edge[]
  d3Root: HierarchyFlowNode
  nodeFocus: ReactFlowNode | null
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addKPINode: (parentId: string) => ReactFlowKPINode
  nodeFocused: string | null
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  setNodeFocused: (slug: string) => void
  isHasChild(nodeId: string): boolean
  removeEmptyNode: () => void
  updateKPINode: (node: UpdateNodeInputType) => void
  removeNode: (nodeId: string) => void
  removeEdgeByNodeId: (nodeId: string) => Edge[]
  updateStyleKPINodeBySlug: (slug: string | null) => void
  getNodeById: (id: string) => ReactFlowNode | null
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
  //Zoom action
  zoom: number
  handleZoom: (isZoomIn?: boolean) => void
  scrollZoom: (isZoomIn?: boolean) => void
}
