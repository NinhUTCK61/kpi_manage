import {
  CommentReplySchema,
  CommentSchema,
  NodeSchema,
  SpeechBallonSchema,
} from 'prisma/generated/zod'
import { z } from 'zod'

export const KpiNodeSchema = z.object({
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().nullable(),
  is_formula: z.boolean().nullable(),
  value2number: z.number().nullable(),
  node_style: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().nullable(),
})

export const NodeSchemaInput = z.object({
  id: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().nullable(),
  is_formula: z.boolean().nullable(),
  value2number: z.number().nullable(),
  node_style: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().nullable(),
})

export const DeleteNodeSchemaInput = z.object({
  id: z.string().array(),
})

const kpiNodeSchema = NodeSchema.merge(z.object({ type: z.literal('kpi') }))
const speechBallonSchema = SpeechBallonSchema.merge(z.object({ type: z.literal('speech_ballon') }))
const commentSchema = CommentSchema.merge(
  z.object({ replies: z.array(CommentReplySchema), type: z.literal('comment') }),
)

const reactFlowSchema = z.object({
  id: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

const reactFlowKPINode = reactFlowSchema.merge(
  z.object({
    data: kpiNodeSchema,
    type: z.literal('kpi'),
  }),
)

const reactFlowSpeechBallonNode = reactFlowSchema.merge(
  z.object({
    data: speechBallonSchema,
    type: z.literal('speech_ballon'),
  }),
)

const reactFlowCommentNode = reactFlowSchema.merge(
  z.object({
    data: commentSchema,
    type: z.literal('comment'),
  }),
)

export const ReactFlowSchema = z.object({
  nodes: z.array(reactFlowKPINode || reactFlowSpeechBallonNode || reactFlowCommentNode),
  edges: z
    .object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
      animated: z.boolean(),
    })
    .array(),
})

export type ReactFlowType = z.infer<typeof ReactFlowSchema>

export const GetListNodesSchemaInput = z.object({
  template_id: z.string(),
  root_node_id: z.string(),
})
