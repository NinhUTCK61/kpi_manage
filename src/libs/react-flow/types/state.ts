import { ViewPortAction } from '@/features/node/constant'
import {
  CommentReplyOutputType,
  DeleteCommentInputType,
  UpdateCommentInputType,
  UpdateCommentReplyInputType,
} from '@/libs/schema/comment'
import { UpdateNodeInputType } from '@/libs/schema/node'
import { UpdateSpeechBallonInputType } from '@/libs/schema/speechballon'
import { DialogDeleteNodeProps } from '@/libs/shared/types/utils'
import React from 'react'
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
  removeEmptyKPINode: () => void
  updateKPINode: (node: UpdateNodeInputType & { is_saved?: boolean }, shouldFocus?: boolean) => void
  bulkUpdateKpiNode: (nodes: UpdateNodeInputType[]) => void
  removeNode: (nodeId: string) => { nodes: ReactFlowNode[]; edges: Edge[] }
  removeEdgeByNodeId: (nodeId: string) => Edge[]
  getKPINodeById: (id: string) => ReactFlowNode | null
  setNodeFocused: <T extends ReactFlowNode>(node: string | T | null) => void
  nodeFocused: ReactFlowNode | null
  getNodeById: (id: string) => ReactFlowNode | null
  removeEmptyNode(options?: {
    ignoreFocusNode?: boolean
    ignoreSpeechBallon?: boolean
    ignoreComment?: boolean
    ignoreKpi?: boolean
  }): void
  // Speech ballon
  addSpeechBallon: (node: ReactFlowSpeechBallonNode, shouldFocus?: boolean) => void
  removeSpeechBallon: (speechBallonId: string) => void
  removeEmptySpeechBallon: () => void
  nodeCopy: ReactFlowNode | null
  setNodeCopy: (node: string | null) => void
  updateSpeechBallon: (node: UpdateSpeechBallonInputType, shouldFocus?: boolean) => void
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
  getKpiNodes: () => ReactFlowKPINode[]

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

  updateReactFlowNode: (
    node: Partial<ReactFlowNode> & { id: string },
    shouldFocus?: boolean,
  ) => void
  toggleDraggable: (id: string, isDraggable?: boolean) => void
  //dialogDeleteNode
  dialogDelete: DialogDeleteNodeProps | null
  handleToggleDialogDelete: (dialogProps?: DialogDeleteNodeProps) => void
}

type onSave = ((pastState: ReactFlowNode[], currentState: ReactFlowNode[]) => void) | undefined

export type Write<T, U> = Omit<T, keyof U> & U

export interface _TemporalState {
  pastStates: Partial<RFStore>[]
  futureStates: Partial<RFStore>[]
  getCurrentState: () => Partial<RFStore>

  undo: (steps?: number) => void
  redo: (steps?: number) => void
  clear: () => void

  setOnSave: (onSave: onSave) => void
  _onSave: onSave
  _handleSet: (pastState: Partial<RFStore>) => void
}

export interface TemporalOptions {
  pastStates?: Partial<RFStore>[]
  futureStates?: Partial<RFStore>[]
  onSave?: onSave
}

export type TemporalState = Omit<_TemporalState, '_onSave' | '_handleSet'>
