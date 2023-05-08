import {
  CommentReplySchema,
  CommentSchema,
  NodeSchema,
  SpeechBallonSchema,
  UserSchema,
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

const reactFlowSchema = z.object({
  id: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
})

const reactFlowKPINode = reactFlowSchema.merge(
  z.object({
    data: NodeSchema,
    type: z.literal('kpi'),
  }),
)

const reactFlowSpeechBallonNode = reactFlowSchema.merge(
  z.object({
    data: SpeechBallonSchema,
    type: z.literal('speech_ballon'),
  }),
)

const reactFlowCommentNode = reactFlowSchema.merge(
  z.object({
    data: CommentSchema.merge(
      z.object({
        replies: z.array(
          CommentReplySchema.merge(z.object({ author: UserSchema.omit({ password: true }) })),
        ),
        author: UserSchema.omit({ password: true }),
      }),
    ),
    type: z.literal('comment'),
  }),
)

export const ReactFlowSchema = z.object({
  nodes: z.array(z.union([reactFlowKPINode, reactFlowSpeechBallonNode, reactFlowCommentNode])),
  edges: z
    .object({
      id: z.string(),
      source: z.string(),
      target: z.string(),
      animated: z.boolean(),
      type: z.string(),
    })
    .array(),
})

export type ReactFlowType = z.infer<typeof ReactFlowSchema>

export const GetListNodeInputSchema = z.object({
  template_id: z.string(),
})
