import { NodeSchema, SpeechBallonSchema } from 'prisma/generated/zod'
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

export const DeleteNodeSchema = z.object({
  id: z.string().array(),
})

const kpiNodeSchema = NodeSchema.merge(z.object({ type: z.literal('kpi') }))
const scpeechBallonSchema = SpeechBallonSchema.merge(z.object({ type: z.literal('speech_ballon') }))

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
    data: scpeechBallonSchema,
    type: z.literal('speech_ballon'),
  }),
)

export const ReactFlowSchema = z.object({
  nodes: z.array(reactFlowKPINode || reactFlowSpeechBallonNode),
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

export const GetListNodes = z.object({
  template_id: z.string(),
  root_node_id: z.string(),
})
