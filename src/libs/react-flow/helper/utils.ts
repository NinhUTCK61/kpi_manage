import { CommentReplyOutputType, CreateCommentOutputType } from '@/libs/schema/comment'
import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { differenceWith } from 'lodash'
import { Node as RFNode } from 'reactflow'
import { NodeFormProps } from '../components'
import {
  KPINodeType,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  ReactFlowSpeechBallonNode,
} from '../types'

export function isEmptyKPINodeForm(node: KPINodeType | NodeFormProps) {
  return !node.input_title && !node.input_value && !node.unit
}

export function isReactFlowKPINode(node: RFNode): node is ReactFlowKPINode {
  return node.type === 'kpi'
}

export function isReactFlowKPISpeechBallon(node: RFNode): node is ReactFlowSpeechBallonNode {
  return node.type === 'speech_ballon'
}

export function getDifferenceNodesByPosition<T extends ReactFlowNode>(nodes: T[], queryNodes: T[]) {
  const diff = differenceWith(nodes, queryNodes, (a, b) => {
    return a.id === b.id && a.position.x === b.position.x && a.position.y === b.position.y
  })

  return diff
}

export function filterKpiNodes<
  V extends T,
  T extends ReactFlowNode | ReactFlowNodeOutputType = ReactFlowNode | ReactFlowNodeOutputType,
>(nodes: T[]) {
  return nodes.filter<V>((node): node is V => node.type === 'kpi')
}

export function isCommentNode(
  data: CommentReplyOutputType | CreateCommentOutputType,
): data is CreateCommentOutputType {
  return (
    (data as CreateCommentOutputType).x !== undefined &&
    (data as CreateCommentOutputType).y !== undefined
  )
}

export function getCommentReply(_nodes: ReactFlowNode[], id: string, comment_id: string) {
  let commentReply

  const comment = _nodes.find<ReactFlowCommentNode>(
    (cmt): cmt is ReactFlowCommentNode => cmt.type === 'comment' && cmt.id === comment_id,
  )

  if (comment) {
    commentReply = comment.data.replies.find((el) => el.id === id)
  }

  return commentReply
}

export function getComment(_nodes: ReactFlowNode[], id: string) {
  const nodes = _nodes.find<ReactFlowCommentNode>(
    (data): data is ReactFlowCommentNode => data.id === id && data.type === 'comment',
  )

  return nodes
}
