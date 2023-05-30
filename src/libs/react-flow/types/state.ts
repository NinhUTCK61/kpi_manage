import { ViewPortAction } from '@/features/node/constant'
import {
  CommentReplyOutputType,
  DeleteCommentInputType,
  UpdateCommentInputType,
  UpdateCommentReplyInputType,
} from '@/libs/schema/comment'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { UpdateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, OnNodesDelete, XYPosition } from 'reactflow'
import {
  HierarchyFlowNode,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  ReactFlowSpeechBallonNode,
} from './node'

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
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  hasChild(nodeId: string): boolean
  removeEmptyNode: () => void
  updateKPINode: (node: UpdateNodeInputType & { is_saved?: boolean }, shouldFocus?: boolean) => void
  removeNode: (nodeId: string) => { nodes: ReactFlowNode[]; edges: Edge[] }
  removeEdgeByNodeId: (nodeId: string) => Edge[]
  getKPINodeById: (id: string) => ReactFlowNode | null
  setNodeFocused: <T extends ReactFlowNode>(node: string | T | null) => void
  nodeFocused: ReactFlowNode | null
  // Speech ballon
  addSpeechBallon: (node: ReactFlowSpeechBallonNode) => void
  removeSpeechBallon: (speechBallonId: string) => void
  removeEmptySpeechBallon: () => void
  nodeCopy: ReactFlowNode | null
  setNodeCopy: (node: string | null) => void
  updateSpeechBallon: (node: UpdateSpeechBallonInputType) => void
  // Comment action
  addComment: (node: ReactFlowCommentNode) => void
  updateComment: (data: UpdateCommentInputType) => void
  removeComment: (commentId: string) => void
  addCommentReply: (reply: CommentReplyOutputType, commentReplyIndex?: number) => void
  updateCommentReply: (reply: UpdateCommentReplyInputType & { comment_id: string }) => void
  removeCommentReply: (reply: DeleteCommentInputType & { comment_id: string }) => {
    remove: CommentReplyOutputType | undefined
    commentReplyIndex: number | undefined
  }

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
