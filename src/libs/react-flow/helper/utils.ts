import { CommentReplyOutputType, CreateCommentOutputType } from '@/libs/schema/comment'
import { ReactFlowNodeOutputType } from '@/libs/schema/node'
import { differenceWith, isString } from 'lodash'
import { Node as RFNode } from 'reactflow'
import { NodeFormProps } from '../components'
import { NODE_CLASS_NAME, PANE_CLASS_NAME } from '../constant'
import {
  KPINodeType,
  ReactFlowCommentNode,
  ReactFlowKPINode,
  ReactFlowNode,
  ReactFlowNodeData,
  ReactFlowSpeechBallonNode,
  SpeechBallonNodeType,
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

export function isReactFlowKPIComment(node: RFNode): node is ReactFlowCommentNode {
  return node.type === 'comment'
}

export function isSpeechBallonData(data: ReactFlowNodeData): data is SpeechBallonNodeType {
  return (
    (data as SpeechBallonNodeType).shape !== undefined &&
    (data as SpeechBallonNodeType).layout !== undefined
  )
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

export function getSpeechBallon(_nodes: ReactFlowNode[], id: string) {
  const node = _nodes.find<ReactFlowSpeechBallonNode>(
    (data): data is ReactFlowSpeechBallonNode => data.id === id && data.type === 'speech_ballon',
  )
  return node
}

export function isCommentNode(
  data: CommentReplyOutputType | CreateCommentOutputType,
): data is CreateCommentOutputType {
  return (
    (data as CreateCommentOutputType).x !== undefined &&
    (data as CreateCommentOutputType).y !== undefined
  )
}

export function getCommentReply(comment: ReactFlowCommentNode, reply_id: string) {
  return comment.data.replies.find((el) => el.id === reply_id)
}

export function getComment(_nodes: ReactFlowNode[], id: string) {
  const node = _nodes.find<ReactFlowCommentNode>(
    (data): data is ReactFlowCommentNode => data.id === id && data.type === 'comment',
  )

  return node
}

export function isStyleAreaClick(e: MouseEvent | TouchEvent) {
  const styleArea = document.getElementById('choose-style-area')
  return styleArea && styleArea.contains(e.target as HTMLElement)
}

export function isPaneClick(e: MouseEvent | TouchEvent) {
  const targetClass = (e.target as HTMLDivElement).className
  if (!isString(targetClass)) return
  return targetClass === PANE_CLASS_NAME || targetClass.split(' ').includes(NODE_CLASS_NAME)
}
