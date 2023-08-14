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
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, XYPosition } from 'reactflow'
import { UpdateStateReason } from '../store/constants'
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
  onConnect: OnConnect
  addKPINode: (parentId: string) => ReactFlowKPINode
  onNodeClick: (e: React.MouseEvent, n: ReactFlowNode) => void
  hasChild(nodeId: string): boolean
  removeEmptyKPINode: () => void
  updateKPINode: (
    node: UpdateNodeInputType & { is_saved?: boolean },
    shouldFocus?: boolean,
    reason?: UpdateStateReason,
  ) => void
  bulkUpdateKpiNode: (nodes: UpdateNodeInputType[], reason?: UpdateStateReason) => void
  removeKPINode: (
    nodeId: string,
    reason?: UpdateStateReason,
  ) => { nodes: ReactFlowNode[]; edges: Edge[] }
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
  getKpiNodes: () => ReactFlowKPINode[]

  // Speech ballon
  addSpeechBallon: (
    node: ReactFlowSpeechBallonNode,
    shouldFocus?: boolean,
    reason?: UpdateStateReason,
  ) => void
  removeSpeechBallon: (speechBallonId: string, reason?: UpdateStateReason) => void
  removeEmptySpeechBallon: () => void
  updateSpeechBallon: (
    node: UpdateSpeechBallonInputType & { is_saved?: boolean },
    shouldFocus?: boolean,
    reason?: UpdateStateReason,
  ) => void
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

  nodeCopy: ReactFlowNode | null
  setNodeCopy: (node: string | null) => void
  updateBy: {
    updateStateReason: UpdateStateReason
    payload?: unknown
  }
}

export type TemporalRFStoreState = Partial<RFStore> & { updatedReason?: UpdatedReason }

export type onStateChange = (stateApply: TemporalRFStoreState, type: 'undo' | 'redo') => void

export type Write<T, U> = Omit<T, keyof U> & U

export type UpdatedReason = {
  updateBy: RFStore['updateBy']
  oldDiff: ReactFlowNode[]
  newDiff: ReactFlowNode[]
}

export interface _TemporalState {
  pastStates: Array<TemporalRFStoreState>
  futureStates: Array<TemporalRFStoreState>
  getCurrentState: () => Partial<RFStore>

  undo: (steps?: number) => void
  redo: (steps?: number) => void
  clear: () => void

  setOnStateChange: (onSave: onStateChange) => void
  _onStateChange?: onStateChange
  _handleSet: (pastState: Partial<RFStore>, updatedReason: UpdatedReason) => void
}

export interface TemporalOptions {
  pastStates?: Partial<RFStore>[]
  futureStates?: Partial<RFStore>[]
  onStateChange: onStateChange
}

export type TemporalState = Omit<_TemporalState, '_onStateChange' | '_handleSet'>
