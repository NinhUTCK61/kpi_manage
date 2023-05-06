import { ViewPortAction } from '@/features/node/constant'
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'
import { HierarchyFlowNode, KPINodeType, ReactFlowNode } from './node'

export type RFStore = {
  nodes: ReactFlowNode[]
  edges: Edge[]
  d3Root: HierarchyFlowNode
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  addNode: (parentId: string) => ReactFlowNode[]
  nodeFocused: string | null
  onNodeClick: (e: React.MouseEvent, n: Node<KPINodeType>) => void
  setNodeFocused: (nodeSlug: string) => void
  isHasChild(nodeId: string): boolean
  removeNodes: (nodeId: string, parentId: string) => void
  updateNode: (
    nodeSlug: string,
    data: {
      input_title: string
      input_value: string | null
      unit: string | null
    },
  ) => void
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
