import { ViewPortAction } from '@/features/node/constant'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, OnNodesDelete, XYPosition } from 'reactflow'
import { HierarchyFlowNode, ReactFlowCommentNode, ReactFlowKPINode, ReactFlowNode } from './node'

export type RFStore = {
  templateId: string
  nodes: ReactFlowNode[]
  edges: Edge[]
  d3Root: HierarchyFlowNode
  handleNodesChange: OnNodesChange
  handleEdgesChange: OnEdgesChange
  deleteNodes: OnNodesDelete
  onConnect: OnConnect
  addKPINode: (parentId: string) => ReactFlowKPINode
  addSpeechBallon: () => void
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  hasChild(nodeId: string): boolean
  removeEmptyNode: () => void
  updateKPINode: (node: UpdateNodeInputType) => void
  removeNode: (nodeId: string) => { nodes: ReactFlowNode[]; edges: Edge[] }
  removeEdgeByNodeId: (nodeId: string) => Edge[]
  getKPINodeById: (id: string) => ReactFlowNode | null
  setNodeFocused: <T extends ReactFlowNode>(node: string | T | null) => void
  nodeFocused: ReactFlowNode | null
  // Comment action
  addComment: (node: ReactFlowCommentNode) => void
  removeComment: (commentId: string) => void
  // Toolbar action
  viewportAction: ViewPortAction
  changeViewportAction: (action: ViewPortAction) => void
  stroke: number | null
  changeShapeStroke: (stroke: number) => void
  shape: string | null
  changeShapeType: (shape: string) => void
  //Zoom action
  zoom: number
  handleZoom: (isZoomIn?: boolean) => void
  scrollZoom: (isZoomIn?: boolean) => void
  setZoom: (zoom: number) => void

  activePosition: XYPosition | null
  setActivePosition: (position: XYPosition | null) => void

  container: HTMLDivElement | null
  setContainer: (container: HTMLDivElement | null) => void
}
