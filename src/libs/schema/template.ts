import { z } from 'zod'

export const UpdateTemplateSchemaInput = z.object({
  id: z.string(),
  name: z.string().min(1).max(255).optional(),
  image_url: z.string().optional(),
})

export const LikeTemplateSchemaInput = z.object({
  id: z.string(),
  is_favorite: z.boolean(),
})

export const DeleteTemplateSchemaInput = z.object({
  id: z.string(),
  is_permanently: z.boolean().optional().default(false),
})

export const ListTemplateSchemaInput = z.object({ isTrash: z.boolean().default(false) })

export const TemplateDataSchema = z.object({
  template_id: z.string(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().nullable(),
  public_url: z.string().nullable(),
  is_owner: z.boolean(),
  is_favorite: z.boolean(),
  can_edit: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
})

export const TemplateDataOutputSchema = z.array(TemplateDataSchema)

export const GetTemplateByIdInputSchema = z.object({
  template_id: z.string(),
})
