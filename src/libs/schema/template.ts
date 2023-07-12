import { Template, UserTemplate } from 'prisma/generated/zod'
import { z } from 'zod'

export const UpdateTemplateInputSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255).optional(),
  image_url: z.string().optional(),
})

export const LikeTemplateInputSchema = z.object({
  id: z.string(),
  is_favorite: z.boolean(),
})

export const DeleteTemplateInputSchema = z.object({
  id: z.string(),
  is_permanently: z.boolean().optional().default(false),
})

export const SearchTemplateInputSchema = z.object({
  name: z.string().trim(),
})

export const ListTemplateInputSchema = z.object({
  isTrash: z.boolean().default(false),
  name: z.string().optional(),
})

export const FavoriteTemplateSchema = z.object({
  name: z.string().optional(),
})

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
  id: z.string(),
})

export type TemplateType = z.infer<typeof TemplateDataSchema>
export type LikeTemplateInputType = z.infer<typeof LikeTemplateInputSchema>
export type UpdateTemplateInputType = z.infer<typeof UpdateTemplateInputSchema>
export type UserTemplateType = UserTemplate & { template: Template }
export type TemplateOutputType = z.infer<typeof TemplateDataOutputSchema>
export type SearchTemplateInputType = z.infer<typeof SearchTemplateInputSchema>
