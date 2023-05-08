import { CommentWithAuthorType } from '@/libs/schema/comment'
import { Node as PNode, SpeechBallon } from '@prisma/client'
import { HierarchyNode } from 'd3-hierarchy'
import { Node as FlowNode } from 'reactflow'

export type NodeType = 'kpi' | 'speech_ballon' | 'comment'

export type KPINodeType = PNode
export type SpeechBallonNodeType = SpeechBallon
export type CommentNodeType = CommentWithAuthorType

export type RootNode = KPINodeType & {
  children: RootNode[]
}

export type ReactFlowKPINode = FlowNode<KPINodeType, 'kpi'>
export type ReactFlowSpeechBallonNode = FlowNode<SpeechBallonNodeType, 'speech_ballon'>
export type ReactFlowCommentNode = FlowNode<CommentNodeType, 'comment'>

export type ReactFlowNodeData = KPINodeType | SpeechBallonNodeType | CommentNodeType

export type ReactFlowNode = ReactFlowKPINode | ReactFlowSpeechBallonNode | ReactFlowCommentNode

export type HierarchyFlowNode = HierarchyNode<ReactFlowKPINode>
