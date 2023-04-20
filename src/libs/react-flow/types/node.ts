import { Node as PNode, SpeechBallon } from '@prisma/client'
import { HierarchyNode } from 'd3-hierarchy'
import { Node } from 'reactflow'

export type NodeType = 'kpi' | 'speech_ballon' | 'comment'

export type KPINode = PNode & { type: 'kpi' }
export type SpeechBallonNode = SpeechBallon & { type: 'speech_ballon' }
export type CommentNode = Comment & { type: 'comment' }

export type RootNode = KPINode & {
  children: RootNode[]
}

export type ReactFlowKPINode = Node<KPINode>
export type ReactFlowSpeechBallonNode = Node<SpeechBallonNode>
export type ReactFlowCommentNode = Node<CommentNode>

export type ReactFlowNode = Node<KPINode | SpeechBallonNode | CommentNode>

export type HierarchyFlowNode = HierarchyNode<ReactFlowKPINode>
