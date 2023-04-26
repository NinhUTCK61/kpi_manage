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
  viewportAction: ViewPortAction
  changeViewportAction: (action: ViewPortAction) => void
  nodeFocused: string | null
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  fontSize: string | null
  changeFontSize: (fontSize: string) => void
  color: string | null
  changeColor: (color: string) => void
  colorShape: string | null
  changeColorShape: (color: string) => void
  stroke: number | null
  changeStroke: (stroke: number) => void
  shape: string | null
  changeShape: (shape: string) => void
}
