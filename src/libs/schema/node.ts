import { NodeSchema, SpeechBallonSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import { CommentWithAuthorSchema } from './comment'

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

export const CreateNodeInputSchema = z.object({
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

export type CreateNodeInputType = z.infer<typeof CreateNodeInputSchema>

export const UpdateNodeInputSchema = NodeSchema.partial().required({ id: true, template_id: true })

export type UpdateNodeInputType = z.infer<typeof UpdateNodeInputSchema>

export const DeleteNodeInputSchema = z.object({
  id: z.string().array(),
})

// React Flow Schema

const BaseReactFlowSchema = z.object({
  id: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

const ReactFlowKPINode = BaseReactFlowSchema.merge(
  z.object({
    data: NodeSchema,
    type: z.literal('kpi'),
  }),
)

const ReactFlowSpeechBallonNode = BaseReactFlowSchema.merge(
  z.object({
    data: SpeechBallonSchema,
    type: z.literal('speech_ballon'),
  }),
)

const ReactFlowCommentNode = BaseReactFlowSchema.merge(
  z.object({
    data: CommentWithAuthorSchema,
    type: z.literal('comment'),
  }),
)

export const ReactFlowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  animated: z.boolean(),
  type: z.string(),
})

export const ReactFlowNodeOutputSchema = z.union([
  ReactFlowKPINode,
  ReactFlowSpeechBallonNode,
  ReactFlowCommentNode,
])

export const NodesOutputSchema = z.object({
  nodes: z.array(ReactFlowNodeOutputSchema),
  edges: ReactFlowEdgeSchema.array(),
})

export type NodesOutputType = z.infer<typeof NodesOutputSchema>
export type ReactFlowKPINodeOutputType = z.infer<typeof ReactFlowKPINode>
export type ReactFlowSpeechBallonNodeOutputType = z.infer<typeof ReactFlowSpeechBallonNode>
export type ReactFlowCommentNodeOutputType = z.infer<typeof ReactFlowCommentNode>
export type ReactFlowNodeOutputType = z.infer<typeof ReactFlowNodeOutputSchema>
export type ReactFlowOutputEdge = z.infer<typeof ReactFlowEdgeSchema>

// ---------------------------------------------------------

export const GetListNodeInputSchema = z.object({
  template_id: z.string(),
})
