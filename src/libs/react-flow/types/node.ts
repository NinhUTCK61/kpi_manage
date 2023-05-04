import { Comment, CommentReply, Node as PNode, SpeechBallon, User } from '@prisma/client'
import { HierarchyNode } from 'd3-hierarchy'
import { Node } from 'reactflow'

export type NodeType = 'kpi' | 'speech_ballon' | 'comment'

export type KPINodeType = PNode & { type: 'kpi' }
export type SpeechBallonNodeType = SpeechBallon & { type: 'speech_ballon' }
export type CommentNodeType = GetCommentType & { type: 'comment' }

export type RootNode = KPINodeType & {
  children: RootNode[]
}

export type ReactFlowKPINode = Node<KPINodeType>
export type ReactFlowSpeechBallonNode = Node<SpeechBallonNodeType>
export type ReactFlowCommentNode = Node<CommentNodeType>

export type ReactFlowNode = Node<KPINodeType | SpeechBallonNodeType | CommentNodeType>

export type HierarchyFlowNode = HierarchyNode<ReactFlowKPINode>

export type GetCommentType = Comment & {
  replies: (CommentReply & {
    author: User | null
  })[]
  author: User | null
}
