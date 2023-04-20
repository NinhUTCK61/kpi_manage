import { z } from 'zod'

export const NodeSchemaActive = z.object({
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().nullable(),
  is_formula: z.boolean().nullable(),
  value2number: z.number().nullable(),
  style: z.string().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().nullable(),
})

export const DeleteNodeSchema = z.object({
  id: z.string().array(),
})
