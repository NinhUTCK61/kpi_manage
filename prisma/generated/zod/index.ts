import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const CommentReplyScalarFieldEnumSchema = z.enum(['id','content','comment_id','author_id','created_at','updated_at']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','template_id','author_id','x','y','created_at','updated_at']);

export const NodeScalarFieldEnumSchema = z.enum(['id','slug','input_title','input_value','is_formula','value2number','node_style','x','y','unit','template_id','parent_node_id']);

export const PasswordResetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','updated_at']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ReasonScalarFieldEnumSchema = z.enum(['id','text_ja','text_en','type','is_enabled','order','created_at','updated_at']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const SpeechBallonScalarFieldEnumSchema = z.enum(['id','template_id','node_id','text','x','y','shape','node_style','stroke','created_at','updated_at']);

export const TemplateScalarFieldEnumSchema = z.enum(['id','root_note_id','name','image_url','public_url','created_at','updated_at','deleted_at']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserReasonScalarFieldEnumSchema = z.enum(['id','user_id','reason_id']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','first_name','email','emailVerified','image','company_name','role_in_company','date_of_birth','password','created_at','updated_at']);

export const UserTemplateScalarFieldEnumSchema = z.enum(['id','user_id','template_id','is_owner','is_favorite','can_edit','created_at','updated_at']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const ReasonTypeSchema = z.enum(['REASON_KNOW','ISSUE']);

export type ReasonTypeType = `${z.infer<typeof ReasonTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  first_name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  company_name: z.string().nullable(),
  role_in_company: z.string().nullable(),
  date_of_birth: z.coerce.date().nullable(),
  password: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  template_id: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// COMMENT REPLY SCHEMA
/////////////////////////////////////////

export const CommentReplySchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  comment_id: z.string(),
  author_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type CommentReply = z.infer<typeof CommentReplySchema>

/////////////////////////////////////////
// USER TEMPLATE SCHEMA
/////////////////////////////////////////

export const UserTemplateSchema = z.object({
  id: z.string().cuid(),
  user_id: z.string(),
  template_id: z.string(),
  is_owner: z.boolean(),
  is_favorite: z.boolean(),
  can_edit: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type UserTemplate = z.infer<typeof UserTemplateSchema>

/////////////////////////////////////////
// TEMPLATE SCHEMA
/////////////////////////////////////////

export const TemplateSchema = z.object({
  id: z.string().cuid(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().nullable(),
  public_url: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
})

export type Template = z.infer<typeof TemplateSchema>

/////////////////////////////////////////
// NODE SCHEMA
/////////////////////////////////////////

export const NodeSchema = z.object({
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

export type Node = z.infer<typeof NodeSchema>

/////////////////////////////////////////
// SPEECH BALLON SCHEMA
/////////////////////////////////////////

export const SpeechBallonSchema = z.object({
  id: z.string().cuid(),
  template_id: z.string(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().nullable(),
  stroke: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type SpeechBallon = z.infer<typeof SpeechBallonSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// PASSWORD RESET SCHEMA
/////////////////////////////////////////

export const PasswordResetSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type PasswordReset = z.infer<typeof PasswordResetSchema>

/////////////////////////////////////////
// REASON SCHEMA
/////////////////////////////////////////

export const ReasonSchema = z.object({
  type: ReasonTypeSchema,
  id: z.number().int(),
  text_ja: z.string(),
  text_en: z.string(),
  is_enabled: z.boolean(),
  order: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Reason = z.infer<typeof ReasonSchema>

/////////////////////////////////////////
// USER REASON SCHEMA
/////////////////////////////////////////

export const UserReasonSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  reason_id: z.number().int(),
})

export type UserReason = z.infer<typeof UserReasonSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  templates: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentReplyFindManyArgsSchema)]).optional(),
  password_reset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
  reasons: z.union([z.boolean(),z.lazy(() => UserReasonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  templates: z.boolean().optional(),
  comments: z.boolean().optional(),
  replies: z.boolean().optional(),
  reasons: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  first_name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  company_name: z.boolean().optional(),
  role_in_company: z.boolean().optional(),
  date_of_birth: z.boolean().optional(),
  password: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  templates: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentReplyFindManyArgsSchema)]).optional(),
  password_reset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
  reasons: z.union([z.boolean(),z.lazy(() => UserReasonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentReplyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CommentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommentCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> = z.object({
  replies: z.boolean().optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  template_id: z.boolean().optional(),
  author_id: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentReplyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT REPLY
//------------------------------------------------------

export const CommentReplyIncludeSchema: z.ZodType<Prisma.CommentReplyInclude> = z.object({
  comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CommentReplyArgsSchema: z.ZodType<Prisma.CommentReplyArgs> = z.object({
  select: z.lazy(() => CommentReplySelectSchema).optional(),
  include: z.lazy(() => CommentReplyIncludeSchema).optional(),
}).strict();

export const CommentReplySelectSchema: z.ZodType<Prisma.CommentReplySelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  comment_id: z.boolean().optional(),
  author_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER TEMPLATE
//------------------------------------------------------

export const UserTemplateIncludeSchema: z.ZodType<Prisma.UserTemplateInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserTemplateArgsSchema: z.ZodType<Prisma.UserTemplateArgs> = z.object({
  select: z.lazy(() => UserTemplateSelectSchema).optional(),
  include: z.lazy(() => UserTemplateIncludeSchema).optional(),
}).strict();

export const UserTemplateSelectSchema: z.ZodType<Prisma.UserTemplateSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  template_id: z.boolean().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TEMPLATE
//------------------------------------------------------

export const TemplateIncludeSchema: z.ZodType<Prisma.TemplateInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  speech_ballon: z.union([z.boolean(),z.lazy(() => SpeechBallonFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TemplateArgsSchema: z.ZodType<Prisma.TemplateArgs> = z.object({
  select: z.lazy(() => TemplateSelectSchema).optional(),
  include: z.lazy(() => TemplateIncludeSchema).optional(),
}).strict();

export const TemplateCountOutputTypeArgsSchema: z.ZodType<Prisma.TemplateCountOutputTypeArgs> = z.object({
  select: z.lazy(() => TemplateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TemplateCountOutputTypeSelectSchema: z.ZodType<Prisma.TemplateCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  node: z.boolean().optional(),
  speech_ballon: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const TemplateSelectSchema: z.ZodType<Prisma.TemplateSelect> = z.object({
  id: z.boolean().optional(),
  root_note_id: z.boolean().optional(),
  name: z.boolean().optional(),
  image_url: z.boolean().optional(),
  public_url: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  speech_ballon: z.union([z.boolean(),z.lazy(() => SpeechBallonFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NODE
//------------------------------------------------------

export const NodeIncludeSchema: z.ZodType<Prisma.NodeInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  parent_node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  speech_ballon: z.union([z.boolean(),z.lazy(() => SpeechBallonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NodeArgsSchema: z.ZodType<Prisma.NodeArgs> = z.object({
  select: z.lazy(() => NodeSelectSchema).optional(),
  include: z.lazy(() => NodeIncludeSchema).optional(),
}).strict();

export const NodeCountOutputTypeArgsSchema: z.ZodType<Prisma.NodeCountOutputTypeArgs> = z.object({
  select: z.lazy(() => NodeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NodeCountOutputTypeSelectSchema: z.ZodType<Prisma.NodeCountOutputTypeSelect> = z.object({
  children: z.boolean().optional(),
  speech_ballon: z.boolean().optional(),
}).strict();

export const NodeSelectSchema: z.ZodType<Prisma.NodeSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  input_title: z.boolean().optional(),
  input_value: z.boolean().optional(),
  is_formula: z.boolean().optional(),
  value2number: z.boolean().optional(),
  node_style: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  unit: z.boolean().optional(),
  template_id: z.boolean().optional(),
  parent_node_id: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  parent_node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  speech_ballon: z.union([z.boolean(),z.lazy(() => SpeechBallonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NodeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPEECH BALLON
//------------------------------------------------------

export const SpeechBallonIncludeSchema: z.ZodType<Prisma.SpeechBallonInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

export const SpeechBallonArgsSchema: z.ZodType<Prisma.SpeechBallonArgs> = z.object({
  select: z.lazy(() => SpeechBallonSelectSchema).optional(),
  include: z.lazy(() => SpeechBallonIncludeSchema).optional(),
}).strict();

export const SpeechBallonSelectSchema: z.ZodType<Prisma.SpeechBallonSelect> = z.object({
  id: z.boolean().optional(),
  template_id: z.boolean().optional(),
  node_id: z.boolean().optional(),
  text: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  shape: z.boolean().optional(),
  node_style: z.boolean().optional(),
  stroke: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// PASSWORD RESET
//------------------------------------------------------

export const PasswordResetIncludeSchema: z.ZodType<Prisma.PasswordResetInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasswordResetArgsSchema: z.ZodType<Prisma.PasswordResetArgs> = z.object({
  select: z.lazy(() => PasswordResetSelectSchema).optional(),
  include: z.lazy(() => PasswordResetIncludeSchema).optional(),
}).strict();

export const PasswordResetSelectSchema: z.ZodType<Prisma.PasswordResetSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REASON
//------------------------------------------------------

export const ReasonIncludeSchema: z.ZodType<Prisma.ReasonInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserReasonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReasonCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ReasonArgsSchema: z.ZodType<Prisma.ReasonArgs> = z.object({
  select: z.lazy(() => ReasonSelectSchema).optional(),
  include: z.lazy(() => ReasonIncludeSchema).optional(),
}).strict();

export const ReasonCountOutputTypeArgsSchema: z.ZodType<Prisma.ReasonCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ReasonCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReasonCountOutputTypeSelectSchema: z.ZodType<Prisma.ReasonCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
}).strict();

export const ReasonSelectSchema: z.ZodType<Prisma.ReasonSelect> = z.object({
  id: z.boolean().optional(),
  text_ja: z.boolean().optional(),
  text_en: z.boolean().optional(),
  type: z.boolean().optional(),
  is_enabled: z.boolean().optional(),
  order: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserReasonFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReasonCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER REASON
//------------------------------------------------------

export const UserReasonIncludeSchema: z.ZodType<Prisma.UserReasonInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  reason: z.union([z.boolean(),z.lazy(() => ReasonArgsSchema)]).optional(),
}).strict()

export const UserReasonArgsSchema: z.ZodType<Prisma.UserReasonArgs> = z.object({
  select: z.lazy(() => UserReasonSelectSchema).optional(),
  include: z.lazy(() => UserReasonIncludeSchema).optional(),
}).strict();

export const UserReasonSelectSchema: z.ZodType<Prisma.UserReasonSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  reason_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  reason: z.union([z.boolean(),z.lazy(() => ReasonArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional()
}).strict();

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional()
}).strict();

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role_in_company: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  date_of_birth: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  templates: z.lazy(() => UserTemplateListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  replies: z.lazy(() => CommentReplyListRelationFilterSchema).optional(),
  password_reset: z.union([ z.lazy(() => PasswordResetRelationFilterSchema),z.lazy(() => PasswordResetWhereInputSchema) ]).optional().nullable(),
  reasons: z.lazy(() => UserReasonListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  role_in_company: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  templates: z.lazy(() => UserTemplateOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  replies: z.lazy(() => CommentReplyOrderByRelationAggregateInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetOrderByWithRelationInputSchema).optional(),
  reasons: z.lazy(() => UserReasonOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  role_in_company: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  first_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  company_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role_in_company: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  date_of_birth: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  replies: z.lazy(() => CommentReplyListRelationFilterSchema).optional()
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  replies: z.lazy(() => CommentReplyOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CommentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CommentSumOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentReplyWhereInputSchema: z.ZodType<Prisma.CommentReplyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentReplyWhereInputSchema),z.lazy(() => CommentReplyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentReplyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentReplyWhereInputSchema),z.lazy(() => CommentReplyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  comment: z.union([ z.lazy(() => CommentRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CommentReplyOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentReplyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  comment_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentReplyWhereUniqueInputSchema: z.ZodType<Prisma.CommentReplyWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CommentReplyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentReplyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  comment_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentReplyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentReplyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentReplyMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentReplyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentReplyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentReplyScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentReplyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentReplyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentReplyScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentReplyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  comment_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserTemplateWhereInputSchema: z.ZodType<Prisma.UserTemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTemplateWhereInputSchema),z.lazy(() => UserTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTemplateWhereInputSchema),z.lazy(() => UserTemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_owner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_favorite: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_edit: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserTemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserTemplateWhereUniqueInputSchema: z.ZodType<Prisma.UserTemplateWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  user_id_template_id: z.lazy(() => UserTemplateUser_idTemplate_idCompoundUniqueInputSchema).optional()
}).strict();

export const UserTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserTemplateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserTemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserTemplateMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserTemplateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserTemplateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTemplateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => UserTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_owner: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  is_favorite: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_edit: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TemplateWhereInputSchema: z.ZodType<Prisma.TemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TemplateWhereInputSchema),z.lazy(() => TemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TemplateWhereInputSchema),z.lazy(() => TemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  root_note_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  public_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  users: z.lazy(() => UserTemplateListRelationFilterSchema).optional(),
  node: z.lazy(() => NodeListRelationFilterSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const TemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.TemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  root_note_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  public_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserTemplateOrderByRelationAggregateInputSchema).optional(),
  node: z.lazy(() => NodeOrderByRelationAggregateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TemplateWhereUniqueInputSchema: z.ZodType<Prisma.TemplateWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const TemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.TemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  root_note_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  public_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TemplateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TemplateMinOrderByAggregateInputSchema).optional()
}).strict();

export const TemplateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TemplateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => TemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TemplateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => TemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  root_note_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  public_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const NodeWhereInputSchema: z.ZodType<Prisma.NodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_formula: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  value2number: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  node_style: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => NodeListRelationFilterSchema).optional(),
  parent_node: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
  speech_ballon: z.lazy(() => SpeechBallonListRelationFilterSchema).optional()
}).strict();

export const NodeOrderByWithRelationInputSchema: z.ZodType<Prisma.NodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  children: z.lazy(() => NodeOrderByRelationAggregateInputSchema).optional(),
  parent_node: z.lazy(() => NodeOrderByWithRelationInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonOrderByRelationAggregateInputSchema).optional()
}).strict();

export const NodeWhereUniqueInputSchema: z.ZodType<Prisma.NodeWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const NodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NodeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => NodeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NodeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NodeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => NodeSumOrderByAggregateInputSchema).optional()
}).strict();

export const NodeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NodeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeScalarWhereWithAggregatesInputSchema),z.lazy(() => NodeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  is_formula: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  value2number: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  node_style: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  template_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SpeechBallonWhereInputSchema: z.ZodType<Prisma.SpeechBallonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpeechBallonWhereInputSchema),z.lazy(() => SpeechBallonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpeechBallonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpeechBallonWhereInputSchema),z.lazy(() => SpeechBallonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  node_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  shape: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  node_style: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stroke: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional(),
  node: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional(),
}).strict();

export const SpeechBallonOrderByWithRelationInputSchema: z.ZodType<Prisma.SpeechBallonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  node_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  shape: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  stroke: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  node: z.lazy(() => NodeOrderByWithRelationInputSchema).optional()
}).strict();

export const SpeechBallonWhereUniqueInputSchema: z.ZodType<Prisma.SpeechBallonWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const SpeechBallonOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpeechBallonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  node_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  shape: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  stroke: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpeechBallonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SpeechBallonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpeechBallonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpeechBallonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SpeechBallonSumOrderByAggregateInputSchema).optional()
}).strict();

export const SpeechBallonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpeechBallonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpeechBallonScalarWhereWithAggregatesInputSchema),z.lazy(() => SpeechBallonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpeechBallonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpeechBallonScalarWhereWithAggregatesInputSchema),z.lazy(() => SpeechBallonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  node_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  shape: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  node_style: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  stroke: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional()
}).strict();

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetWhereInputSchema: z.ZodType<Prisma.PasswordResetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetWhereInputSchema),z.lazy(() => PasswordResetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetWhereInputSchema),z.lazy(() => PasswordResetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PasswordResetOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PasswordResetWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string().optional(),
  token: z.string().optional(),
  user_id_token: z.lazy(() => PasswordResetUser_idTokenCompoundUniqueInputSchema).optional()
}).strict();

export const PasswordResetOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordResetCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PasswordResetAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordResetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordResetMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PasswordResetSumOrderByAggregateInputSchema).optional()
}).strict();

export const PasswordResetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordResetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReasonWhereInputSchema: z.ZodType<Prisma.ReasonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReasonWhereInputSchema),z.lazy(() => ReasonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReasonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReasonWhereInputSchema),z.lazy(() => ReasonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text_ja: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text_en: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumReasonTypeFilterSchema),z.lazy(() => ReasonTypeSchema) ]).optional(),
  is_enabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserReasonListRelationFilterSchema).optional()
}).strict();

export const ReasonOrderByWithRelationInputSchema: z.ZodType<Prisma.ReasonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text_ja: z.lazy(() => SortOrderSchema).optional(),
  text_en: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  is_enabled: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserReasonOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReasonWhereUniqueInputSchema: z.ZodType<Prisma.ReasonWhereUniqueInput> = z.object({
  id: z.number().int().optional()
}).strict();

export const ReasonOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReasonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text_ja: z.lazy(() => SortOrderSchema).optional(),
  text_en: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  is_enabled: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReasonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReasonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReasonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReasonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReasonSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReasonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReasonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReasonScalarWhereWithAggregatesInputSchema),z.lazy(() => ReasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReasonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReasonScalarWhereWithAggregatesInputSchema),z.lazy(() => ReasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text_ja: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text_en: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumReasonTypeWithAggregatesFilterSchema),z.lazy(() => ReasonTypeSchema) ]).optional(),
  is_enabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserReasonWhereInputSchema: z.ZodType<Prisma.UserReasonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserReasonWhereInputSchema),z.lazy(() => UserReasonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReasonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReasonWhereInputSchema),z.lazy(() => UserReasonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  reason: z.union([ z.lazy(() => ReasonRelationFilterSchema),z.lazy(() => ReasonWhereInputSchema) ]).optional(),
}).strict();

export const UserReasonOrderByWithRelationInputSchema: z.ZodType<Prisma.UserReasonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  reason: z.lazy(() => ReasonOrderByWithRelationInputSchema).optional()
}).strict();

export const UserReasonWhereUniqueInputSchema: z.ZodType<Prisma.UserReasonWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
  user_id_reason_id: z.lazy(() => UserReasonUser_idReason_idCompoundUniqueInputSchema).optional()
}).strict();

export const UserReasonOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserReasonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserReasonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserReasonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserReasonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserReasonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserReasonSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserReasonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserReasonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserReasonScalarWhereWithAggregatesInputSchema),z.lazy(() => UserReasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReasonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReasonScalarWhereWithAggregatesInputSchema),z.lazy(() => UserReasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reason_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  template_id: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  template_id: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyCreateInputSchema: z.ZodType<Prisma.CommentReplyCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutRepliesInputSchema)
}).strict();

export const CommentReplyUncheckedCreateInputSchema: z.ZodType<Prisma.CommentReplyUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  comment_id: z.string(),
  author_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyUpdateInputSchema: z.ZodType<Prisma.CommentReplyUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentUpdateOneRequiredWithoutRepliesNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutRepliesNestedInputSchema).optional()
}).strict();

export const CommentReplyUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyCreateManyInputSchema: z.ZodType<Prisma.CommentReplyCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  comment_id: z.string(),
  author_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentReplyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateInputSchema: z.ZodType<Prisma.UserTemplateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutTemplatesInputSchema)
}).strict();

export const UserTemplateUncheckedCreateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  template_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserTemplateUpdateInputSchema: z.ZodType<Prisma.UserTemplateUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTemplatesNestedInputSchema).optional()
}).strict();

export const UserTemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateManyInputSchema: z.ZodType<Prisma.UserTemplateCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  template_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserTemplateUpdateManyMutationInputSchema: z.ZodType<Prisma.UserTemplateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TemplateCreateInputSchema: z.ZodType<Prisma.TemplateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUpdateInputSchema: z.ZodType<Prisma.TemplateUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateCreateManyInputSchema: z.ZodType<Prisma.TemplateCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable()
}).strict();

export const TemplateUpdateManyMutationInputSchema: z.ZodType<Prisma.TemplateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TemplateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NodeCreateInputSchema: z.ZodType<Prisma.NodeCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  children: z.lazy(() => NodeCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutChildrenInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().optional().nullable(),
  children: z.lazy(() => NodeUncheckedCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUpdateInputSchema: z.ZodType<Prisma.NodeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  children: z.lazy(() => NodeUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutChildrenNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => NodeUncheckedUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeCreateManyInputSchema: z.ZodType<Prisma.NodeCreateManyInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().optional().nullable()
}).strict();

export const NodeUpdateManyMutationInputSchema: z.ZodType<Prisma.NodeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpeechBallonCreateInputSchema: z.ZodType<Prisma.SpeechBallonCreateInput> = z.object({
  id: z.string().cuid().optional(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutSpeech_ballonInputSchema),
  node: z.lazy(() => NodeCreateNestedOneWithoutSpeech_ballonInputSchema)
}).strict();

export const SpeechBallonUncheckedCreateInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  template_id: z.string(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SpeechBallonUpdateInputSchema: z.ZodType<Prisma.SpeechBallonUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema).optional()
}).strict();

export const SpeechBallonUncheckedUpdateInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpeechBallonCreateManyInputSchema: z.ZodType<Prisma.SpeechBallonCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  template_id: z.string(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SpeechBallonUpdateManyMutationInputSchema: z.ZodType<Prisma.SpeechBallonUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpeechBallonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetCreateInputSchema: z.ZodType<Prisma.PasswordResetCreateInput> = z.object({
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPassword_resetInputSchema)
}).strict();

export const PasswordResetUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUpdateInputSchema: z.ZodType<Prisma.PasswordResetUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPassword_resetNestedInputSchema).optional()
}).strict();

export const PasswordResetUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetCreateManyInputSchema: z.ZodType<Prisma.PasswordResetCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReasonCreateInputSchema: z.ZodType<Prisma.ReasonCreateInput> = z.object({
  text_ja: z.string(),
  text_en: z.string(),
  type: z.lazy(() => ReasonTypeSchema).optional(),
  is_enabled: z.boolean().optional(),
  order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => UserReasonCreateNestedManyWithoutReasonInputSchema).optional()
}).strict();

export const ReasonUncheckedCreateInputSchema: z.ZodType<Prisma.ReasonUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  text_ja: z.string(),
  text_en: z.string(),
  type: z.lazy(() => ReasonTypeSchema).optional(),
  is_enabled: z.boolean().optional(),
  order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutReasonInputSchema).optional()
}).strict();

export const ReasonUpdateInputSchema: z.ZodType<Prisma.ReasonUpdateInput> = z.object({
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserReasonUpdateManyWithoutReasonNestedInputSchema).optional()
}).strict();

export const ReasonUncheckedUpdateInputSchema: z.ZodType<Prisma.ReasonUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserReasonUncheckedUpdateManyWithoutReasonNestedInputSchema).optional()
}).strict();

export const ReasonCreateManyInputSchema: z.ZodType<Prisma.ReasonCreateManyInput> = z.object({
  id: z.number().int().optional(),
  text_ja: z.string(),
  text_en: z.string(),
  type: z.lazy(() => ReasonTypeSchema).optional(),
  is_enabled: z.boolean().optional(),
  order: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ReasonUpdateManyMutationInputSchema: z.ZodType<Prisma.ReasonUpdateManyMutationInput> = z.object({
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReasonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReasonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonCreateInputSchema: z.ZodType<Prisma.UserReasonCreateInput> = z.object({
  user: z.lazy(() => UserCreateNestedOneWithoutReasonsInputSchema),
  reason: z.lazy(() => ReasonCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserReasonUncheckedCreateInputSchema: z.ZodType<Prisma.UserReasonUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string(),
  reason_id: z.number().int()
}).strict();

export const UserReasonUpdateInputSchema: z.ZodType<Prisma.UserReasonUpdateInput> = z.object({
  user: z.lazy(() => UserUpdateOneRequiredWithoutReasonsNestedInputSchema).optional(),
  reason: z.lazy(() => ReasonUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserReasonUncheckedUpdateInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonCreateManyInputSchema: z.ZodType<Prisma.UserReasonCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string(),
  reason_id: z.number().int()
}).strict();

export const UserReasonUpdateManyMutationInputSchema: z.ZodType<Prisma.UserReasonUpdateManyMutationInput> = z.object({
}).strict();

export const UserReasonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reason_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const UserTemplateListRelationFilterSchema: z.ZodType<Prisma.UserTemplateListRelationFilter> = z.object({
  every: z.lazy(() => UserTemplateWhereInputSchema).optional(),
  some: z.lazy(() => UserTemplateWhereInputSchema).optional(),
  none: z.lazy(() => UserTemplateWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const CommentReplyListRelationFilterSchema: z.ZodType<Prisma.CommentReplyListRelationFilter> = z.object({
  every: z.lazy(() => CommentReplyWhereInputSchema).optional(),
  some: z.lazy(() => CommentReplyWhereInputSchema).optional(),
  none: z.lazy(() => CommentReplyWhereInputSchema).optional()
}).strict();

export const PasswordResetRelationFilterSchema: z.ZodType<Prisma.PasswordResetRelationFilter> = z.object({
  is: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable()
}).strict();

export const UserReasonListRelationFilterSchema: z.ZodType<Prisma.UserReasonListRelationFilter> = z.object({
  every: z.lazy(() => UserReasonWhereInputSchema).optional(),
  some: z.lazy(() => UserReasonWhereInputSchema).optional(),
  none: z.lazy(() => UserReasonWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTemplateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserTemplateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentReplyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentReplyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReasonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserReasonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  role_in_company: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  role_in_company: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  company_name: z.lazy(() => SortOrderSchema).optional(),
  role_in_company: z.lazy(() => SortOrderSchema).optional(),
  date_of_birth: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const TemplateRelationFilterSchema: z.ZodType<Prisma.TemplateRelationFilter> = z.object({
  is: z.lazy(() => TemplateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TemplateWhereInputSchema).optional().nullable()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommentAvgOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommentSumOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const CommentRelationFilterSchema: z.ZodType<Prisma.CommentRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const CommentReplyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentReplyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  comment_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentReplyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentReplyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  comment_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentReplyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentReplyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  comment_id: z.lazy(() => SortOrderSchema).optional(),
  author_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserTemplateUser_idTemplate_idCompoundUniqueInputSchema: z.ZodType<Prisma.UserTemplateUser_idTemplate_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  template_id: z.string()
}).strict();

export const UserTemplateCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTemplateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTemplateMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NodeListRelationFilterSchema: z.ZodType<Prisma.NodeListRelationFilter> = z.object({
  every: z.lazy(() => NodeWhereInputSchema).optional(),
  some: z.lazy(() => NodeWhereInputSchema).optional(),
  none: z.lazy(() => NodeWhereInputSchema).optional()
}).strict();

export const SpeechBallonListRelationFilterSchema: z.ZodType<Prisma.SpeechBallonListRelationFilter> = z.object({
  every: z.lazy(() => SpeechBallonWhereInputSchema).optional(),
  some: z.lazy(() => SpeechBallonWhereInputSchema).optional(),
  none: z.lazy(() => SpeechBallonWhereInputSchema).optional()
}).strict();

export const NodeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NodeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpeechBallonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpeechBallonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TemplateCountOrderByAggregateInputSchema: z.ZodType<Prisma.TemplateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  root_note_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  public_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TemplateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TemplateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  root_note_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  public_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TemplateMinOrderByAggregateInputSchema: z.ZodType<Prisma.TemplateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  root_note_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  public_url: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NodeRelationFilterSchema: z.ZodType<Prisma.NodeRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional().nullable()
}).strict();

export const NodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NodeAvgOrderByAggregateInput> = z.object({
  value2number: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.NodeSumOrderByAggregateInput> = z.object({
  value2number: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const SpeechBallonCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpeechBallonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  node_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  shape: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  stroke: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpeechBallonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SpeechBallonAvgOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpeechBallonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpeechBallonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  node_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  shape: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  stroke: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpeechBallonMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpeechBallonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  node_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  shape: z.lazy(() => SortOrderSchema).optional(),
  node_style: z.lazy(() => SortOrderSchema).optional(),
  stroke: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpeechBallonSumOrderByAggregateInputSchema: z.ZodType<Prisma.SpeechBallonSumOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const PasswordResetUser_idTokenCompoundUniqueInputSchema: z.ZodType<Prisma.PasswordResetUser_idTokenCompoundUniqueInput> = z.object({
  user_id: z.string(),
  token: z.string()
}).strict();

export const PasswordResetCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordResetSumOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumReasonTypeFilterSchema: z.ZodType<Prisma.EnumReasonTypeFilter> = z.object({
  equals: z.lazy(() => ReasonTypeSchema).optional(),
  in: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => NestedEnumReasonTypeFilterSchema) ]).optional(),
}).strict();

export const ReasonCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReasonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text_ja: z.lazy(() => SortOrderSchema).optional(),
  text_en: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  is_enabled: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReasonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReasonAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReasonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReasonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text_ja: z.lazy(() => SortOrderSchema).optional(),
  text_en: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  is_enabled: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReasonMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReasonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  text_ja: z.lazy(() => SortOrderSchema).optional(),
  text_en: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  is_enabled: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReasonSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReasonSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumReasonTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumReasonTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReasonTypeSchema).optional(),
  in: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => NestedEnumReasonTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReasonTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReasonTypeFilterSchema).optional()
}).strict();

export const ReasonRelationFilterSchema: z.ZodType<Prisma.ReasonRelationFilter> = z.object({
  is: z.lazy(() => ReasonWhereInputSchema).optional(),
  isNot: z.lazy(() => ReasonWhereInputSchema).optional()
}).strict();

export const UserReasonUser_idReason_idCompoundUniqueInputSchema: z.ZodType<Prisma.UserReasonUser_idReason_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  reason_id: z.number()
}).strict();

export const UserReasonCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserReasonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReasonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserReasonAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReasonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserReasonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReasonMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserReasonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReasonSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserReasonSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reason_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateCreateWithoutUserInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
}).strict();

export const UserReasonCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserReasonCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonCreateWithoutUserInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateCreateWithoutUserInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
}).strict();

export const UserReasonUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonCreateWithoutUserInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTemplateUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateCreateWithoutUserInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTemplateUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTemplateUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentReplyUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentReplyUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserReasonUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserReasonUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonCreateWithoutUserInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReasonUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserReasonUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateCreateWithoutUserInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTemplateUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserTemplateUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentReplyUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentReplyUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => PasswordResetUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonCreateWithoutUserInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReasonUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserReasonUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TemplateCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentReplyCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyUncheckedCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUncheckedCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TemplateUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.TemplateUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => TemplateUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TemplateUpdateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const CommentReplyUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.CommentReplyUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentReplyUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => CommentReplyUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentReplyUncheckedUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateWithoutCommentInputSchema).array(),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema),z.lazy(() => CommentReplyCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentReplyUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentReplyCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentReplyWhereUniqueInputSchema),z.lazy(() => CommentReplyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => CommentReplyUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentReplyUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => CommentReplyUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedOneWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutRepliesInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutRepliesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRepliesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRepliesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentUpdateOneRequiredWithoutRepliesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneRequiredWithoutRepliesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutRepliesInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutRepliesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRepliesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRepliesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRepliesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRepliesInputSchema) ]).optional(),
}).strict();

export const TemplateCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutTemplatesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTemplatesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTemplatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const TemplateUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.TemplateUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => TemplateUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TemplateUpdateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutTemplatesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTemplatesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutTemplatesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTemplatesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTemplatesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTemplatesInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.NodeCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeCreateWithoutTemplateInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentCreateWithoutTemplateInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeCreateWithoutTemplateInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentCreateWithoutTemplateInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.UserTemplateUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTemplateUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.NodeUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeCreateWithoutTemplateInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.SpeechBallonUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentCreateWithoutTemplateInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema).array(),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => UserTemplateCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserTemplateCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserTemplateWhereUniqueInputSchema),z.lazy(() => UserTemplateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserTemplateUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => UserTemplateUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeCreateWithoutTemplateInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => NodeCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentCreateWithoutTemplateInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => CommentCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TemplateCreateNestedOneWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutNodeInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedManyWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateNestedManyWithoutParent_nodeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateWithoutParent_nodeInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyParent_nodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const SpeechBallonCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedCreateNestedManyWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateNestedManyWithoutParent_nodeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateWithoutParent_nodeInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyParent_nodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonUncheckedCreateNestedManyWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedCreateNestedManyWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyNodeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TemplateUpdateOneWithoutNodeNestedInputSchema: z.ZodType<Prisma.TemplateUpdateOneWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutNodeInputSchema).optional(),
  upsert: z.lazy(() => TemplateUpsertWithoutNodeInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TemplateUpdateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutNodeInputSchema) ]).optional(),
}).strict();

export const NodeUpdateManyWithoutParent_nodeNestedInputSchema: z.ZodType<Prisma.NodeUpdateManyWithoutParent_nodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateWithoutParent_nodeInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutParent_nodeInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutParent_nodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyParent_nodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutParent_nodeInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutParent_nodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutParent_nodeInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutParent_nodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutChildrenInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict();

export const SpeechBallonUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.SpeechBallonUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyWithoutParent_nodeNestedInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutParent_nodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateWithoutParent_nodeInputSchema).array(),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema),z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NodeUpsertWithWhereUniqueWithoutParent_nodeInputSchema),z.lazy(() => NodeUpsertWithWhereUniqueWithoutParent_nodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NodeCreateManyParent_nodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NodeWhereUniqueInputSchema),z.lazy(() => NodeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithWhereUniqueWithoutParent_nodeInputSchema),z.lazy(() => NodeUpdateWithWhereUniqueWithoutParent_nodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NodeUpdateManyWithWhereWithoutParent_nodeInputSchema),z.lazy(() => NodeUpdateManyWithWhereWithoutParent_nodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpeechBallonUncheckedUpdateManyWithoutNodeNestedInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateManyWithoutNodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema).array(),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema),z.lazy(() => SpeechBallonCreateOrConnectWithoutNodeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpsertWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpeechBallonCreateManyNodeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpeechBallonWhereUniqueInputSchema),z.lazy(() => SpeechBallonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpdateWithWhereUniqueWithoutNodeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutNodeInputSchema),z.lazy(() => SpeechBallonUpdateManyWithWhereWithoutNodeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TemplateCreateNestedOneWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutSpeech_ballonInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutSpeech_ballonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutSpeech_ballonInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutSpeech_ballonInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedCreateWithoutSpeech_ballonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutSpeech_ballonInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const TemplateUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema: z.ZodType<Prisma.TemplateUpdateOneRequiredWithoutSpeech_ballonNestedInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutSpeech_ballonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutSpeech_ballonInputSchema).optional(),
  upsert: z.lazy(() => TemplateUpsertWithoutSpeech_ballonInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TemplateUpdateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutSpeech_ballonInputSchema) ]).optional(),
}).strict();

export const NodeUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneRequiredWithoutSpeech_ballonNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedCreateWithoutSpeech_ballonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutSpeech_ballonInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutSpeech_ballonInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutSpeech_ballonInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPassword_resetInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_resetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPassword_resetNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPassword_resetNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPassword_resetInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPassword_resetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPassword_resetInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserReasonCreateNestedManyWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonCreateNestedManyWithoutReasonInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonCreateWithoutReasonInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyReasonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserReasonUncheckedCreateNestedManyWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUncheckedCreateNestedManyWithoutReasonInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonCreateWithoutReasonInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyReasonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumReasonTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumReasonTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ReasonTypeSchema).optional()
}).strict();

export const UserReasonUpdateManyWithoutReasonNestedInputSchema: z.ZodType<Prisma.UserReasonUpdateManyWithoutReasonNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonCreateWithoutReasonInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutReasonInputSchema),z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutReasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyReasonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutReasonInputSchema),z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutReasonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReasonUpdateManyWithWhereWithoutReasonInputSchema),z.lazy(() => UserReasonUpdateManyWithWhereWithoutReasonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserReasonUncheckedUpdateManyWithoutReasonNestedInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateManyWithoutReasonNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonCreateWithoutReasonInputSchema).array(),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema),z.lazy(() => UserReasonCreateOrConnectWithoutReasonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutReasonInputSchema),z.lazy(() => UserReasonUpsertWithWhereUniqueWithoutReasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReasonCreateManyReasonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReasonWhereUniqueInputSchema),z.lazy(() => UserReasonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutReasonInputSchema),z.lazy(() => UserReasonUpdateWithWhereUniqueWithoutReasonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReasonUpdateManyWithWhereWithoutReasonInputSchema),z.lazy(() => UserReasonUpdateManyWithWhereWithoutReasonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReasonsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReasonsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReasonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReasonsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ReasonCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.ReasonCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => ReasonCreateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReasonCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => ReasonWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutReasonsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReasonsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReasonsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReasonsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReasonsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReasonsInputSchema) ]).optional(),
}).strict();

export const ReasonUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.ReasonUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReasonCreateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReasonCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => ReasonUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => ReasonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReasonUpdateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedEnumReasonTypeFilterSchema: z.ZodType<Prisma.NestedEnumReasonTypeFilter> = z.object({
  equals: z.lazy(() => ReasonTypeSchema).optional(),
  in: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => NestedEnumReasonTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumReasonTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumReasonTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ReasonTypeSchema).optional(),
  in: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  notIn: z.union([ z.lazy(() => ReasonTypeSchema).array(),z.lazy(() => ReasonTypeSchema) ]).optional(),
  not: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => NestedEnumReasonTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumReasonTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumReasonTypeFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserTemplateCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserTemplateUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  template_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserTemplateCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTemplateCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserTemplateCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTemplateCreateManyUserInputSchema),z.lazy(() => UserTemplateCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutCommentsInputSchema),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  template_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema),z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentReplyCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema)
}).strict();

export const CommentReplyUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  comment_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentReplyCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentReplyCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentReplyCreateManyAuthorInputSchema),z.lazy(() => CommentReplyCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasswordResetCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateWithoutUserInput> = z.object({
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const PasswordResetCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserReasonCreateWithoutUserInputSchema: z.ZodType<Prisma.UserReasonCreateWithoutUserInput> = z.object({
  reason: z.lazy(() => ReasonCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserReasonUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  reason_id: z.number()
}).strict();

export const UserReasonCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserReasonCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserReasonCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserReasonCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserReasonCreateManyUserInputSchema),z.lazy(() => UserReasonCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutAccountsInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutSessionsInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserTemplateUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserTemplateUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTemplateUpdateWithoutUserInputSchema),z.lazy(() => UserTemplateUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserTemplateUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserTemplateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTemplateUpdateManyMutationInputSchema),z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplatesInputSchema) ]),
}).strict();

export const UserTemplateScalarWhereInputSchema: z.ZodType<Prisma.UserTemplateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTemplateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_owner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_favorite: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_edit: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutCommentsInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentReplyUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentReplyUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentReplyUpdateWithoutAuthorInputSchema),z.lazy(() => CommentReplyUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentReplyUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentReplyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentReplyUpdateManyMutationInputSchema),z.lazy(() => CommentReplyUncheckedUpdateManyWithoutRepliesInputSchema) ]),
}).strict();

export const CommentReplyScalarWhereInputSchema: z.ZodType<Prisma.CommentReplyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentReplyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentReplyScalarWhereInputSchema),z.lazy(() => CommentReplyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PasswordResetUpsertWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => PasswordResetUpdateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasswordResetUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordResetUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserReasonUpdateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserReasonCreateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserReasonUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserReasonUpdateWithoutUserInputSchema),z.lazy(() => UserReasonUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserReasonUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserReasonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserReasonUpdateManyMutationInputSchema),z.lazy(() => UserReasonUncheckedUpdateManyWithoutReasonsInputSchema) ]),
}).strict();

export const UserReasonScalarWhereInputSchema: z.ZodType<Prisma.UserReasonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReasonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReasonScalarWhereInputSchema),z.lazy(() => UserReasonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reason_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const TemplateCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const CommentReplyCreateWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutRepliesInputSchema)
}).strict();

export const CommentReplyUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUncheckedCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  author_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyCreateOrConnectWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const CommentReplyCreateManyCommentInputEnvelopeSchema: z.ZodType<Prisma.CommentReplyCreateManyCommentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentReplyCreateManyCommentInputSchema),z.lazy(() => CommentReplyCreateManyCommentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TemplateUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => TemplateUpdateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => TemplateCreateWithoutCommentsInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const TemplateUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentReplyUpsertWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUpsertWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentReplyUpdateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedUpdateWithoutCommentInputSchema) ]),
  create: z.union([ z.lazy(() => CommentReplyCreateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const CommentReplyUpdateWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUpdateWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentReplyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentReplyUpdateWithoutCommentInputSchema),z.lazy(() => CommentReplyUncheckedUpdateWithoutCommentInputSchema) ]),
}).strict();

export const CommentReplyUpdateManyWithWhereWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUpdateManyWithWhereWithoutCommentInput> = z.object({
  where: z.lazy(() => CommentReplyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentReplyUpdateManyMutationInputSchema),z.lazy(() => CommentReplyUncheckedUpdateManyWithoutRepliesInputSchema) ]),
}).strict();

export const CommentCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  template_id: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentCreateOrConnectWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const UserCreateWithoutRepliesInputSchema: z.ZodType<Prisma.UserCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRepliesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRepliesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRepliesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const CommentUpsertWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpsertWithoutRepliesInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const CommentUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutRepliesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRepliesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutRepliesInputSchema: z.ZodType<Prisma.UserUpsertWithoutRepliesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRepliesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRepliesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const UserUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.UserUpdateWithoutRepliesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRepliesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const TemplateCreateWithoutUsersInputSchema: z.ZodType<Prisma.TemplateCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutTemplatesInputSchema: z.ZodType<Prisma.UserCreateWithoutTemplatesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTemplatesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTemplatesInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTemplatesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTemplatesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutTemplatesInputSchema) ]),
}).strict();

export const TemplateUpsertWithoutUsersInputSchema: z.ZodType<Prisma.TemplateUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => TemplateUpdateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => TemplateCreateWithoutUsersInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const TemplateUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TemplateUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutTemplatesInputSchema: z.ZodType<Prisma.UserUpsertWithoutTemplatesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTemplatesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTemplatesInputSchema),z.lazy(() => UserUncheckedCreateWithoutTemplatesInputSchema) ]),
}).strict();

export const UserUpdateWithoutTemplatesInputSchema: z.ZodType<Prisma.UserUpdateWithoutTemplatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTemplatesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTemplatesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserTemplateCreateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTemplatesInputSchema)
}).strict();

export const UserTemplateUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserTemplateCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const UserTemplateCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.UserTemplateCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserTemplateCreateManyTemplateInputSchema),z.lazy(() => UserTemplateCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NodeCreateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  children: z.lazy(() => NodeCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutChildrenInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  parent_node_id: z.string().optional().nullable(),
  children: z.lazy(() => NodeUncheckedCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const NodeCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.NodeCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NodeCreateManyTemplateInputSchema),z.lazy(() => NodeCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SpeechBallonCreateWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  node: z.lazy(() => NodeCreateNestedOneWithoutSpeech_ballonInputSchema)
}).strict();

export const SpeechBallonUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SpeechBallonCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const SpeechBallonCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.SpeechBallonCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpeechBallonCreateManyTemplateInputSchema),z.lazy(() => SpeechBallonCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutTemplateInputSchema: z.ZodType<Prisma.CommentCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const CommentCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyTemplateInputSchema),z.lazy(() => CommentCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserTemplateUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserTemplateUpdateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => UserTemplateCreateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const UserTemplateUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => UserTemplateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserTemplateUpdateWithoutTemplateInputSchema),z.lazy(() => UserTemplateUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const UserTemplateUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => UserTemplateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserTemplateUpdateManyMutationInputSchema),z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const NodeUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NodeUpdateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const NodeUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const NodeUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => NodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateManyMutationInputSchema),z.lazy(() => NodeUncheckedUpdateManyWithoutNodeInputSchema) ]),
}).strict();

export const NodeScalarWhereInputSchema: z.ZodType<Prisma.NodeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeScalarWhereInputSchema),z.lazy(() => NodeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  is_formula: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  value2number: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  node_style: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SpeechBallonUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const SpeechBallonUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpeechBallonUpdateWithoutTemplateInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const SpeechBallonUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => SpeechBallonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpeechBallonUpdateManyMutationInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const SpeechBallonScalarWhereInputSchema: z.ZodType<Prisma.SpeechBallonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpeechBallonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpeechBallonScalarWhereInputSchema),z.lazy(() => SpeechBallonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  node_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  shape: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  node_style: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  stroke: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutTemplateInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutCommentsInputSchema) ]),
}).strict();

export const TemplateCreateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutNodeInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const NodeCreateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateWithoutParent_nodeInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  children: z.lazy(() => NodeCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutParent_nodeInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string(),
  children: z.lazy(() => NodeUncheckedCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutParent_nodeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]),
}).strict();

export const NodeCreateManyParent_nodeInputEnvelopeSchema: z.ZodType<Prisma.NodeCreateManyParent_nodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NodeCreateManyParent_nodeInputSchema),z.lazy(() => NodeCreateManyParent_nodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NodeCreateWithoutChildrenInputSchema: z.ZodType<Prisma.NodeCreateWithoutChildrenInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutChildrenInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutChildrenInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().optional().nullable(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedCreateNestedManyWithoutNodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const SpeechBallonCreateWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutSpeech_ballonInputSchema)
}).strict();

export const SpeechBallonUncheckedCreateWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  template_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const SpeechBallonCreateOrConnectWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonCreateOrConnectWithoutNodeInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const SpeechBallonCreateManyNodeInputEnvelopeSchema: z.ZodType<Prisma.SpeechBallonCreateManyNodeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpeechBallonCreateManyNodeInputSchema),z.lazy(() => SpeechBallonCreateManyNodeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TemplateUpsertWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUpsertWithoutNodeInput> = z.object({
  update: z.union([ z.lazy(() => TemplateUpdateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutNodeInputSchema) ]),
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const TemplateUpdateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithWhereUniqueWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpsertWithWhereUniqueWithoutParent_nodeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NodeUpdateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParent_nodeInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]),
}).strict();

export const NodeUpdateWithWhereUniqueWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpdateWithWhereUniqueWithoutParent_nodeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParent_nodeInputSchema) ]),
}).strict();

export const NodeUpdateManyWithWhereWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpdateManyWithWhereWithoutParent_nodeInput> = z.object({
  where: z.lazy(() => NodeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NodeUpdateManyMutationInputSchema),z.lazy(() => NodeUncheckedUpdateManyWithoutChildrenInputSchema) ]),
}).strict();

export const NodeUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.NodeUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutChildrenInputSchema),z.lazy(() => NodeUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict();

export const NodeUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.NodeUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutChildrenNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const SpeechBallonUpsertWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUpsertWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpeechBallonUpdateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateWithoutNodeInputSchema) ]),
  create: z.union([ z.lazy(() => SpeechBallonCreateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const SpeechBallonUpdateWithWhereUniqueWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUpdateWithWhereUniqueWithoutNodeInput> = z.object({
  where: z.lazy(() => SpeechBallonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpeechBallonUpdateWithoutNodeInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateWithoutNodeInputSchema) ]),
}).strict();

export const SpeechBallonUpdateManyWithWhereWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUpdateManyWithWhereWithoutNodeInput> = z.object({
  where: z.lazy(() => SpeechBallonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpeechBallonUpdateManyMutationInputSchema),z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const TemplateCreateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateCreateWithoutSpeech_ballonInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutSpeech_ballonInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string().optional(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutSpeech_ballonInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const NodeCreateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeCreateWithoutSpeech_ballonInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  children: z.lazy(() => NodeCreateNestedManyWithoutParent_nodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutChildrenInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutSpeech_ballonInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string(),
  parent_node_id: z.string().optional().nullable(),
  children: z.lazy(() => NodeUncheckedCreateNestedManyWithoutParent_nodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutSpeech_ballonInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedCreateWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const TemplateUpsertWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateUpsertWithoutSpeech_ballonInput> = z.object({
  update: z.union([ z.lazy(() => TemplateUpdateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutSpeech_ballonInputSchema) ]),
  create: z.union([ z.lazy(() => TemplateCreateWithoutSpeech_ballonInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const TemplateUpdateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateUpdateWithoutSpeech_ballonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutSpeech_ballonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeUpsertWithoutSpeech_ballonInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutSpeech_ballonInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutSpeech_ballonInputSchema),z.lazy(() => NodeUncheckedCreateWithoutSpeech_ballonInputSchema) ]),
}).strict();

export const NodeUpdateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeUpdateWithoutSpeech_ballonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  children: z.lazy(() => NodeUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutChildrenNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutSpeech_ballonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => NodeUncheckedUpdateManyWithoutParent_nodeNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateWithoutPassword_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  reasons: z.lazy(() => UserReasonCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPassword_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPassword_resetInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]),
}).strict();

export const UserUpsertWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUpsertWithoutPassword_resetInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPassword_resetInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPassword_resetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPassword_resetInputSchema) ]),
}).strict();

export const UserUpdateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUpdateWithoutPassword_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPassword_resetInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPassword_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  reasons: z.lazy(() => UserReasonUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserReasonCreateWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonCreateWithoutReasonInput> = z.object({
  user: z.lazy(() => UserCreateNestedOneWithoutReasonsInputSchema)
}).strict();

export const UserReasonUncheckedCreateWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUncheckedCreateWithoutReasonInput> = z.object({
  id: z.number().optional(),
  user_id: z.string()
}).strict();

export const UserReasonCreateOrConnectWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonCreateOrConnectWithoutReasonInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema) ]),
}).strict();

export const UserReasonCreateManyReasonInputEnvelopeSchema: z.ZodType<Prisma.UserReasonCreateManyReasonInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserReasonCreateManyReasonInputSchema),z.lazy(() => UserReasonCreateManyReasonInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserReasonUpsertWithWhereUniqueWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUpsertWithWhereUniqueWithoutReasonInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserReasonUpdateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedUpdateWithoutReasonInputSchema) ]),
  create: z.union([ z.lazy(() => UserReasonCreateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedCreateWithoutReasonInputSchema) ]),
}).strict();

export const UserReasonUpdateWithWhereUniqueWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUpdateWithWhereUniqueWithoutReasonInput> = z.object({
  where: z.lazy(() => UserReasonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserReasonUpdateWithoutReasonInputSchema),z.lazy(() => UserReasonUncheckedUpdateWithoutReasonInputSchema) ]),
}).strict();

export const UserReasonUpdateManyWithWhereWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUpdateManyWithWhereWithoutReasonInput> = z.object({
  where: z.lazy(() => UserReasonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserReasonUpdateManyMutationInputSchema),z.lazy(() => UserReasonUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutReasonsInputSchema: z.ZodType<Prisma.UserCreateWithoutReasonsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReasonsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReasonsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  first_name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),
  role_in_company: z.string().optional().nullable(),
  date_of_birth: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReasonsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReasonsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReasonsInputSchema) ]),
}).strict();

export const ReasonCreateWithoutUsersInputSchema: z.ZodType<Prisma.ReasonCreateWithoutUsersInput> = z.object({
  text_ja: z.string(),
  text_en: z.string(),
  type: z.lazy(() => ReasonTypeSchema).optional(),
  is_enabled: z.boolean().optional(),
  order: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ReasonUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.ReasonUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().optional(),
  text_ja: z.string(),
  text_en: z.string(),
  type: z.lazy(() => ReasonTypeSchema).optional(),
  is_enabled: z.boolean().optional(),
  order: z.number().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const ReasonCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.ReasonCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => ReasonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReasonCreateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserUpsertWithoutReasonsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReasonsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReasonsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReasonsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReasonsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReasonsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReasonsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReasonsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReasonsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role_in_company: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_of_birth: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  templates: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  password_reset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const ReasonUpsertWithoutUsersInputSchema: z.ZodType<Prisma.ReasonUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => ReasonUpdateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => ReasonCreateWithoutUsersInputSchema),z.lazy(() => ReasonUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const ReasonUpdateWithoutUsersInputSchema: z.ZodType<Prisma.ReasonUpdateWithoutUsersInput> = z.object({
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReasonUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.ReasonUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text_ja: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text_en: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ReasonTypeSchema),z.lazy(() => EnumReasonTypeFieldUpdateOperationsInputSchema) ]).optional(),
  is_enabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const UserTemplateCreateManyUserInputSchema: z.ZodType<Prisma.UserTemplateCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  template_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  template_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentReplyCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  comment_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserReasonCreateManyUserInputSchema: z.ZodType<Prisma.UserReasonCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  reason_id: z.number().int()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutAccountsInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutSessionsInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserTemplateUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateUncheckedUpdateManyWithoutTemplatesInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyWithoutTemplatesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutCommentsInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentUpdateOneRequiredWithoutRepliesNestedInputSchema).optional()
}).strict();

export const CommentReplyUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyUncheckedUpdateManyWithoutRepliesInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateManyWithoutRepliesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUpdateWithoutUserInput> = z.object({
  reason: z.lazy(() => ReasonUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserReasonUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonUncheckedUpdateManyWithoutReasonsInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateManyWithoutReasonsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reason_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentReplyCreateManyCommentInputSchema: z.ZodType<Prisma.CommentReplyCreateManyCommentInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  author_id: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentReplyUpdateWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutRepliesNestedInputSchema).optional()
}).strict();

export const CommentReplyUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.CommentReplyUncheckedUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateManyTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateManyTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  user_id: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const NodeCreateManyTemplateInputSchema: z.ZodType<Prisma.NodeCreateManyTemplateInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  parent_node_id: z.string().optional().nullable()
}).strict();

export const SpeechBallonCreateManyTemplateInputSchema: z.ZodType<Prisma.SpeechBallonCreateManyTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  node_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const CommentCreateManyTemplateInputSchema: z.ZodType<Prisma.CommentCreateManyTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  author_id: z.string(),
  x: z.number(),
  y: z.number(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const UserTemplateUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTemplatesNestedInputSchema).optional()
}).strict();

export const UserTemplateUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => NodeUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutChildrenNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  children: z.lazy(() => NodeUncheckedUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateManyWithoutNodeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent_node_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SpeechBallonUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  node: z.lazy(() => NodeUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema).optional()
}).strict();

export const SpeechBallonUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpeechBallonUncheckedUpdateManyWithoutSpeech_ballonInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateManyWithoutSpeech_ballonInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentReplyUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  author_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  replies: z.lazy(() => CommentReplyUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
}).strict();

export const NodeCreateManyParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateManyParent_nodeInput> = z.object({
  id: z.string().optional(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string().optional().nullable(),
  is_formula: z.boolean().optional().nullable(),
  value2number: z.number().optional().nullable(),
  node_style: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  unit: z.string().optional().nullable(),
  template_id: z.string()
}).strict();

export const SpeechBallonCreateManyNodeInputSchema: z.ZodType<Prisma.SpeechBallonCreateManyNodeInput> = z.object({
  id: z.string().cuid().optional(),
  template_id: z.string(),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  shape: z.string(),
  node_style: z.string().optional().nullable(),
  stroke: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const NodeUpdateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpdateWithoutParent_nodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  children: z.lazy(() => NodeUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutParent_nodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => NodeUncheckedUpdateManyWithoutParent_nodeNestedInputSchema).optional(),
  speech_ballon: z.lazy(() => SpeechBallonUncheckedUpdateManyWithoutNodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateManyWithoutChildrenInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutChildrenInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  is_formula: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  value2number: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpeechBallonUpdateWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutSpeech_ballonNestedInputSchema).optional()
}).strict();

export const SpeechBallonUncheckedUpdateWithoutNodeInputSchema: z.ZodType<Prisma.SpeechBallonUncheckedUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  shape: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_style: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  stroke: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonCreateManyReasonInputSchema: z.ZodType<Prisma.UserReasonCreateManyReasonInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.string()
}).strict();

export const UserReasonUpdateWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUpdateWithoutReasonInput> = z.object({
  user: z.lazy(() => UserUpdateOneRequiredWithoutReasonsNestedInputSchema).optional()
}).strict();

export const UserReasonUncheckedUpdateWithoutReasonInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateWithoutReasonInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserReasonUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.UserReasonUncheckedUpdateManyWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: AccountScalarFieldEnumSchema.array().optional(),
}).strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SessionScalarFieldEnumSchema.array().optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentReplyFindFirstArgsSchema: z.ZodType<Prisma.CommentReplyFindFirstArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereInputSchema.optional(),
  orderBy: z.union([ CommentReplyOrderByWithRelationInputSchema.array(),CommentReplyOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentReplyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentReplyScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentReplyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentReplyFindFirstOrThrowArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereInputSchema.optional(),
  orderBy: z.union([ CommentReplyOrderByWithRelationInputSchema.array(),CommentReplyOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentReplyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentReplyScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentReplyFindManyArgsSchema: z.ZodType<Prisma.CommentReplyFindManyArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereInputSchema.optional(),
  orderBy: z.union([ CommentReplyOrderByWithRelationInputSchema.array(),CommentReplyOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentReplyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CommentReplyScalarFieldEnumSchema.array().optional(),
}).strict()

export const CommentReplyAggregateArgsSchema: z.ZodType<Prisma.CommentReplyAggregateArgs> = z.object({
  where: CommentReplyWhereInputSchema.optional(),
  orderBy: z.union([ CommentReplyOrderByWithRelationInputSchema.array(),CommentReplyOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentReplyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentReplyGroupByArgsSchema: z.ZodType<Prisma.CommentReplyGroupByArgs> = z.object({
  where: CommentReplyWhereInputSchema.optional(),
  orderBy: z.union([ CommentReplyOrderByWithAggregationInputSchema.array(),CommentReplyOrderByWithAggregationInputSchema ]).optional(),
  by: CommentReplyScalarFieldEnumSchema.array(),
  having: CommentReplyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentReplyFindUniqueArgsSchema: z.ZodType<Prisma.CommentReplyFindUniqueArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereUniqueInputSchema,
}).strict()

export const CommentReplyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentReplyFindUniqueOrThrowArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereUniqueInputSchema,
}).strict()

export const UserTemplateFindFirstArgsSchema: z.ZodType<Prisma.UserTemplateFindFirstArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereInputSchema.optional(),
  orderBy: z.union([ UserTemplateOrderByWithRelationInputSchema.array(),UserTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTemplateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserTemplateFindFirstOrThrowArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereInputSchema.optional(),
  orderBy: z.union([ UserTemplateOrderByWithRelationInputSchema.array(),UserTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTemplateFindManyArgsSchema: z.ZodType<Prisma.UserTemplateFindManyArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereInputSchema.optional(),
  orderBy: z.union([ UserTemplateOrderByWithRelationInputSchema.array(),UserTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserTemplateAggregateArgsSchema: z.ZodType<Prisma.UserTemplateAggregateArgs> = z.object({
  where: UserTemplateWhereInputSchema.optional(),
  orderBy: z.union([ UserTemplateOrderByWithRelationInputSchema.array(),UserTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: UserTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserTemplateGroupByArgsSchema: z.ZodType<Prisma.UserTemplateGroupByArgs> = z.object({
  where: UserTemplateWhereInputSchema.optional(),
  orderBy: z.union([ UserTemplateOrderByWithAggregationInputSchema.array(),UserTemplateOrderByWithAggregationInputSchema ]).optional(),
  by: UserTemplateScalarFieldEnumSchema.array(),
  having: UserTemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserTemplateFindUniqueArgsSchema: z.ZodType<Prisma.UserTemplateFindUniqueArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereUniqueInputSchema,
}).strict()

export const UserTemplateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserTemplateFindUniqueOrThrowArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereUniqueInputSchema,
}).strict()

export const TemplateFindFirstArgsSchema: z.ZodType<Prisma.TemplateFindFirstArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereInputSchema.optional(),
  orderBy: z.union([ TemplateOrderByWithRelationInputSchema.array(),TemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: TemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const TemplateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TemplateFindFirstOrThrowArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereInputSchema.optional(),
  orderBy: z.union([ TemplateOrderByWithRelationInputSchema.array(),TemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: TemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const TemplateFindManyArgsSchema: z.ZodType<Prisma.TemplateFindManyArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereInputSchema.optional(),
  orderBy: z.union([ TemplateOrderByWithRelationInputSchema.array(),TemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: TemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: TemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const TemplateAggregateArgsSchema: z.ZodType<Prisma.TemplateAggregateArgs> = z.object({
  where: TemplateWhereInputSchema.optional(),
  orderBy: z.union([ TemplateOrderByWithRelationInputSchema.array(),TemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: TemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TemplateGroupByArgsSchema: z.ZodType<Prisma.TemplateGroupByArgs> = z.object({
  where: TemplateWhereInputSchema.optional(),
  orderBy: z.union([ TemplateOrderByWithAggregationInputSchema.array(),TemplateOrderByWithAggregationInputSchema ]).optional(),
  by: TemplateScalarFieldEnumSchema.array(),
  having: TemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TemplateFindUniqueArgsSchema: z.ZodType<Prisma.TemplateFindUniqueArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereUniqueInputSchema,
}).strict()

export const TemplateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TemplateFindUniqueOrThrowArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereUniqueInputSchema,
}).strict()

export const NodeFindFirstArgsSchema: z.ZodType<Prisma.NodeFindFirstArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NodeScalarFieldEnumSchema.array().optional(),
}).strict()

export const NodeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NodeFindFirstOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NodeScalarFieldEnumSchema.array().optional(),
}).strict()

export const NodeFindManyArgsSchema: z.ZodType<Prisma.NodeFindManyArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NodeScalarFieldEnumSchema.array().optional(),
}).strict()

export const NodeAggregateArgsSchema: z.ZodType<Prisma.NodeAggregateArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithRelationInputSchema.array(),NodeOrderByWithRelationInputSchema ]).optional(),
  cursor: NodeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NodeGroupByArgsSchema: z.ZodType<Prisma.NodeGroupByArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
  orderBy: z.union([ NodeOrderByWithAggregationInputSchema.array(),NodeOrderByWithAggregationInputSchema ]).optional(),
  by: NodeScalarFieldEnumSchema.array(),
  having: NodeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const NodeFindUniqueArgsSchema: z.ZodType<Prisma.NodeFindUniqueArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict()

export const NodeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NodeFindUniqueOrThrowArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict()

export const SpeechBallonFindFirstArgsSchema: z.ZodType<Prisma.SpeechBallonFindFirstArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereInputSchema.optional(),
  orderBy: z.union([ SpeechBallonOrderByWithRelationInputSchema.array(),SpeechBallonOrderByWithRelationInputSchema ]).optional(),
  cursor: SpeechBallonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SpeechBallonScalarFieldEnumSchema.array().optional(),
}).strict()

export const SpeechBallonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpeechBallonFindFirstOrThrowArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereInputSchema.optional(),
  orderBy: z.union([ SpeechBallonOrderByWithRelationInputSchema.array(),SpeechBallonOrderByWithRelationInputSchema ]).optional(),
  cursor: SpeechBallonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SpeechBallonScalarFieldEnumSchema.array().optional(),
}).strict()

export const SpeechBallonFindManyArgsSchema: z.ZodType<Prisma.SpeechBallonFindManyArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereInputSchema.optional(),
  orderBy: z.union([ SpeechBallonOrderByWithRelationInputSchema.array(),SpeechBallonOrderByWithRelationInputSchema ]).optional(),
  cursor: SpeechBallonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SpeechBallonScalarFieldEnumSchema.array().optional(),
}).strict()

export const SpeechBallonAggregateArgsSchema: z.ZodType<Prisma.SpeechBallonAggregateArgs> = z.object({
  where: SpeechBallonWhereInputSchema.optional(),
  orderBy: z.union([ SpeechBallonOrderByWithRelationInputSchema.array(),SpeechBallonOrderByWithRelationInputSchema ]).optional(),
  cursor: SpeechBallonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpeechBallonGroupByArgsSchema: z.ZodType<Prisma.SpeechBallonGroupByArgs> = z.object({
  where: SpeechBallonWhereInputSchema.optional(),
  orderBy: z.union([ SpeechBallonOrderByWithAggregationInputSchema.array(),SpeechBallonOrderByWithAggregationInputSchema ]).optional(),
  by: SpeechBallonScalarFieldEnumSchema.array(),
  having: SpeechBallonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SpeechBallonFindUniqueArgsSchema: z.ZodType<Prisma.SpeechBallonFindUniqueArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereUniqueInputSchema,
}).strict()

export const SpeechBallonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpeechBallonFindUniqueOrThrowArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: VerificationTokenScalarFieldEnumSchema.array().optional(),
}).strict()

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const PasswordResetFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetFindFirstArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PasswordResetScalarFieldEnumSchema.array().optional(),
}).strict()

export const PasswordResetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetFindFirstOrThrowArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PasswordResetScalarFieldEnumSchema.array().optional(),
}).strict()

export const PasswordResetFindManyArgsSchema: z.ZodType<Prisma.PasswordResetFindManyArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PasswordResetScalarFieldEnumSchema.array().optional(),
}).strict()

export const PasswordResetAggregateArgsSchema: z.ZodType<Prisma.PasswordResetAggregateArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithRelationInputSchema.array(),PasswordResetOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordResetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasswordResetGroupByArgsSchema: z.ZodType<Prisma.PasswordResetGroupByArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
  orderBy: z.union([ PasswordResetOrderByWithAggregationInputSchema.array(),PasswordResetOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordResetScalarFieldEnumSchema.array(),
  having: PasswordResetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PasswordResetFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetFindUniqueArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetFindUniqueOrThrowArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const ReasonFindFirstArgsSchema: z.ZodType<Prisma.ReasonFindFirstArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereInputSchema.optional(),
  orderBy: z.union([ ReasonOrderByWithRelationInputSchema.array(),ReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const ReasonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReasonFindFirstOrThrowArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereInputSchema.optional(),
  orderBy: z.union([ ReasonOrderByWithRelationInputSchema.array(),ReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const ReasonFindManyArgsSchema: z.ZodType<Prisma.ReasonFindManyArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereInputSchema.optional(),
  orderBy: z.union([ ReasonOrderByWithRelationInputSchema.array(),ReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const ReasonAggregateArgsSchema: z.ZodType<Prisma.ReasonAggregateArgs> = z.object({
  where: ReasonWhereInputSchema.optional(),
  orderBy: z.union([ ReasonOrderByWithRelationInputSchema.array(),ReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: ReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReasonGroupByArgsSchema: z.ZodType<Prisma.ReasonGroupByArgs> = z.object({
  where: ReasonWhereInputSchema.optional(),
  orderBy: z.union([ ReasonOrderByWithAggregationInputSchema.array(),ReasonOrderByWithAggregationInputSchema ]).optional(),
  by: ReasonScalarFieldEnumSchema.array(),
  having: ReasonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ReasonFindUniqueArgsSchema: z.ZodType<Prisma.ReasonFindUniqueArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereUniqueInputSchema,
}).strict()

export const ReasonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReasonFindUniqueOrThrowArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereUniqueInputSchema,
}).strict()

export const UserReasonFindFirstArgsSchema: z.ZodType<Prisma.UserReasonFindFirstArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereInputSchema.optional(),
  orderBy: z.union([ UserReasonOrderByWithRelationInputSchema.array(),UserReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserReasonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserReasonFindFirstOrThrowArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereInputSchema.optional(),
  orderBy: z.union([ UserReasonOrderByWithRelationInputSchema.array(),UserReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserReasonFindManyArgsSchema: z.ZodType<Prisma.UserReasonFindManyArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereInputSchema.optional(),
  orderBy: z.union([ UserReasonOrderByWithRelationInputSchema.array(),UserReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserReasonScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserReasonAggregateArgsSchema: z.ZodType<Prisma.UserReasonAggregateArgs> = z.object({
  where: UserReasonWhereInputSchema.optional(),
  orderBy: z.union([ UserReasonOrderByWithRelationInputSchema.array(),UserReasonOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReasonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserReasonGroupByArgsSchema: z.ZodType<Prisma.UserReasonGroupByArgs> = z.object({
  where: UserReasonWhereInputSchema.optional(),
  orderBy: z.union([ UserReasonOrderByWithAggregationInputSchema.array(),UserReasonOrderByWithAggregationInputSchema ]).optional(),
  by: UserReasonScalarFieldEnumSchema.array(),
  having: UserReasonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserReasonFindUniqueArgsSchema: z.ZodType<Prisma.UserReasonFindUniqueArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereUniqueInputSchema,
}).strict()

export const UserReasonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserReasonFindUniqueOrThrowArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereUniqueInputSchema,
}).strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict()

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict()

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict()

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict()

export const CommentReplyCreateArgsSchema: z.ZodType<Prisma.CommentReplyCreateArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  data: z.union([ CommentReplyCreateInputSchema,CommentReplyUncheckedCreateInputSchema ]),
}).strict()

export const CommentReplyUpsertArgsSchema: z.ZodType<Prisma.CommentReplyUpsertArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereUniqueInputSchema,
  create: z.union([ CommentReplyCreateInputSchema,CommentReplyUncheckedCreateInputSchema ]),
  update: z.union([ CommentReplyUpdateInputSchema,CommentReplyUncheckedUpdateInputSchema ]),
}).strict()

export const CommentReplyCreateManyArgsSchema: z.ZodType<Prisma.CommentReplyCreateManyArgs> = z.object({
  data: z.union([ CommentReplyCreateManyInputSchema,CommentReplyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CommentReplyDeleteArgsSchema: z.ZodType<Prisma.CommentReplyDeleteArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  where: CommentReplyWhereUniqueInputSchema,
}).strict()

export const CommentReplyUpdateArgsSchema: z.ZodType<Prisma.CommentReplyUpdateArgs> = z.object({
  select: CommentReplySelectSchema.optional(),
  include: CommentReplyIncludeSchema.optional(),
  data: z.union([ CommentReplyUpdateInputSchema,CommentReplyUncheckedUpdateInputSchema ]),
  where: CommentReplyWhereUniqueInputSchema,
}).strict()

export const CommentReplyUpdateManyArgsSchema: z.ZodType<Prisma.CommentReplyUpdateManyArgs> = z.object({
  data: z.union([ CommentReplyUpdateManyMutationInputSchema,CommentReplyUncheckedUpdateManyInputSchema ]),
  where: CommentReplyWhereInputSchema.optional(),
}).strict()

export const CommentReplyDeleteManyArgsSchema: z.ZodType<Prisma.CommentReplyDeleteManyArgs> = z.object({
  where: CommentReplyWhereInputSchema.optional(),
}).strict()

export const UserTemplateCreateArgsSchema: z.ZodType<Prisma.UserTemplateCreateArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  data: z.union([ UserTemplateCreateInputSchema,UserTemplateUncheckedCreateInputSchema ]),
}).strict()

export const UserTemplateUpsertArgsSchema: z.ZodType<Prisma.UserTemplateUpsertArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereUniqueInputSchema,
  create: z.union([ UserTemplateCreateInputSchema,UserTemplateUncheckedCreateInputSchema ]),
  update: z.union([ UserTemplateUpdateInputSchema,UserTemplateUncheckedUpdateInputSchema ]),
}).strict()

export const UserTemplateCreateManyArgsSchema: z.ZodType<Prisma.UserTemplateCreateManyArgs> = z.object({
  data: z.union([ UserTemplateCreateManyInputSchema,UserTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserTemplateDeleteArgsSchema: z.ZodType<Prisma.UserTemplateDeleteArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  where: UserTemplateWhereUniqueInputSchema,
}).strict()

export const UserTemplateUpdateArgsSchema: z.ZodType<Prisma.UserTemplateUpdateArgs> = z.object({
  select: UserTemplateSelectSchema.optional(),
  include: UserTemplateIncludeSchema.optional(),
  data: z.union([ UserTemplateUpdateInputSchema,UserTemplateUncheckedUpdateInputSchema ]),
  where: UserTemplateWhereUniqueInputSchema,
}).strict()

export const UserTemplateUpdateManyArgsSchema: z.ZodType<Prisma.UserTemplateUpdateManyArgs> = z.object({
  data: z.union([ UserTemplateUpdateManyMutationInputSchema,UserTemplateUncheckedUpdateManyInputSchema ]),
  where: UserTemplateWhereInputSchema.optional(),
}).strict()

export const UserTemplateDeleteManyArgsSchema: z.ZodType<Prisma.UserTemplateDeleteManyArgs> = z.object({
  where: UserTemplateWhereInputSchema.optional(),
}).strict()

export const TemplateCreateArgsSchema: z.ZodType<Prisma.TemplateCreateArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  data: z.union([ TemplateCreateInputSchema,TemplateUncheckedCreateInputSchema ]),
}).strict()

export const TemplateUpsertArgsSchema: z.ZodType<Prisma.TemplateUpsertArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereUniqueInputSchema,
  create: z.union([ TemplateCreateInputSchema,TemplateUncheckedCreateInputSchema ]),
  update: z.union([ TemplateUpdateInputSchema,TemplateUncheckedUpdateInputSchema ]),
}).strict()

export const TemplateCreateManyArgsSchema: z.ZodType<Prisma.TemplateCreateManyArgs> = z.object({
  data: z.union([ TemplateCreateManyInputSchema,TemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TemplateDeleteArgsSchema: z.ZodType<Prisma.TemplateDeleteArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  where: TemplateWhereUniqueInputSchema,
}).strict()

export const TemplateUpdateArgsSchema: z.ZodType<Prisma.TemplateUpdateArgs> = z.object({
  select: TemplateSelectSchema.optional(),
  include: TemplateIncludeSchema.optional(),
  data: z.union([ TemplateUpdateInputSchema,TemplateUncheckedUpdateInputSchema ]),
  where: TemplateWhereUniqueInputSchema,
}).strict()

export const TemplateUpdateManyArgsSchema: z.ZodType<Prisma.TemplateUpdateManyArgs> = z.object({
  data: z.union([ TemplateUpdateManyMutationInputSchema,TemplateUncheckedUpdateManyInputSchema ]),
  where: TemplateWhereInputSchema.optional(),
}).strict()

export const TemplateDeleteManyArgsSchema: z.ZodType<Prisma.TemplateDeleteManyArgs> = z.object({
  where: TemplateWhereInputSchema.optional(),
}).strict()

export const NodeCreateArgsSchema: z.ZodType<Prisma.NodeCreateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
}).strict()

export const NodeUpsertArgsSchema: z.ZodType<Prisma.NodeUpsertArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
  create: z.union([ NodeCreateInputSchema,NodeUncheckedCreateInputSchema ]),
  update: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
}).strict()

export const NodeCreateManyArgsSchema: z.ZodType<Prisma.NodeCreateManyArgs> = z.object({
  data: z.union([ NodeCreateManyInputSchema,NodeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const NodeDeleteArgsSchema: z.ZodType<Prisma.NodeDeleteArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  where: NodeWhereUniqueInputSchema,
}).strict()

export const NodeUpdateArgsSchema: z.ZodType<Prisma.NodeUpdateArgs> = z.object({
  select: NodeSelectSchema.optional(),
  include: NodeIncludeSchema.optional(),
  data: z.union([ NodeUpdateInputSchema,NodeUncheckedUpdateInputSchema ]),
  where: NodeWhereUniqueInputSchema,
}).strict()

export const NodeUpdateManyArgsSchema: z.ZodType<Prisma.NodeUpdateManyArgs> = z.object({
  data: z.union([ NodeUpdateManyMutationInputSchema,NodeUncheckedUpdateManyInputSchema ]),
  where: NodeWhereInputSchema.optional(),
}).strict()

export const NodeDeleteManyArgsSchema: z.ZodType<Prisma.NodeDeleteManyArgs> = z.object({
  where: NodeWhereInputSchema.optional(),
}).strict()

export const SpeechBallonCreateArgsSchema: z.ZodType<Prisma.SpeechBallonCreateArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  data: z.union([ SpeechBallonCreateInputSchema,SpeechBallonUncheckedCreateInputSchema ]),
}).strict()

export const SpeechBallonUpsertArgsSchema: z.ZodType<Prisma.SpeechBallonUpsertArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereUniqueInputSchema,
  create: z.union([ SpeechBallonCreateInputSchema,SpeechBallonUncheckedCreateInputSchema ]),
  update: z.union([ SpeechBallonUpdateInputSchema,SpeechBallonUncheckedUpdateInputSchema ]),
}).strict()

export const SpeechBallonCreateManyArgsSchema: z.ZodType<Prisma.SpeechBallonCreateManyArgs> = z.object({
  data: z.union([ SpeechBallonCreateManyInputSchema,SpeechBallonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SpeechBallonDeleteArgsSchema: z.ZodType<Prisma.SpeechBallonDeleteArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  where: SpeechBallonWhereUniqueInputSchema,
}).strict()

export const SpeechBallonUpdateArgsSchema: z.ZodType<Prisma.SpeechBallonUpdateArgs> = z.object({
  select: SpeechBallonSelectSchema.optional(),
  include: SpeechBallonIncludeSchema.optional(),
  data: z.union([ SpeechBallonUpdateInputSchema,SpeechBallonUncheckedUpdateInputSchema ]),
  where: SpeechBallonWhereUniqueInputSchema,
}).strict()

export const SpeechBallonUpdateManyArgsSchema: z.ZodType<Prisma.SpeechBallonUpdateManyArgs> = z.object({
  data: z.union([ SpeechBallonUpdateManyMutationInputSchema,SpeechBallonUncheckedUpdateManyInputSchema ]),
  where: SpeechBallonWhereInputSchema.optional(),
}).strict()

export const SpeechBallonDeleteManyArgsSchema: z.ZodType<Prisma.SpeechBallonDeleteManyArgs> = z.object({
  where: SpeechBallonWhereInputSchema.optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict()

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict()

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict()

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict()

export const PasswordResetCreateArgsSchema: z.ZodType<Prisma.PasswordResetCreateArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  data: z.union([ PasswordResetCreateInputSchema,PasswordResetUncheckedCreateInputSchema ]),
}).strict()

export const PasswordResetUpsertArgsSchema: z.ZodType<Prisma.PasswordResetUpsertArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
  create: z.union([ PasswordResetCreateInputSchema,PasswordResetUncheckedCreateInputSchema ]),
  update: z.union([ PasswordResetUpdateInputSchema,PasswordResetUncheckedUpdateInputSchema ]),
}).strict()

export const PasswordResetCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetCreateManyArgs> = z.object({
  data: z.union([ PasswordResetCreateManyInputSchema,PasswordResetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PasswordResetDeleteArgsSchema: z.ZodType<Prisma.PasswordResetDeleteArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetUpdateArgsSchema: z.ZodType<Prisma.PasswordResetUpdateArgs> = z.object({
  select: PasswordResetSelectSchema.optional(),
  include: PasswordResetIncludeSchema.optional(),
  data: z.union([ PasswordResetUpdateInputSchema,PasswordResetUncheckedUpdateInputSchema ]),
  where: PasswordResetWhereUniqueInputSchema,
}).strict()

export const PasswordResetUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetUpdateManyArgs> = z.object({
  data: z.union([ PasswordResetUpdateManyMutationInputSchema,PasswordResetUncheckedUpdateManyInputSchema ]),
  where: PasswordResetWhereInputSchema.optional(),
}).strict()

export const PasswordResetDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetDeleteManyArgs> = z.object({
  where: PasswordResetWhereInputSchema.optional(),
}).strict()

export const ReasonCreateArgsSchema: z.ZodType<Prisma.ReasonCreateArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  data: z.union([ ReasonCreateInputSchema,ReasonUncheckedCreateInputSchema ]),
}).strict()

export const ReasonUpsertArgsSchema: z.ZodType<Prisma.ReasonUpsertArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereUniqueInputSchema,
  create: z.union([ ReasonCreateInputSchema,ReasonUncheckedCreateInputSchema ]),
  update: z.union([ ReasonUpdateInputSchema,ReasonUncheckedUpdateInputSchema ]),
}).strict()

export const ReasonCreateManyArgsSchema: z.ZodType<Prisma.ReasonCreateManyArgs> = z.object({
  data: z.union([ ReasonCreateManyInputSchema,ReasonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ReasonDeleteArgsSchema: z.ZodType<Prisma.ReasonDeleteArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  where: ReasonWhereUniqueInputSchema,
}).strict()

export const ReasonUpdateArgsSchema: z.ZodType<Prisma.ReasonUpdateArgs> = z.object({
  select: ReasonSelectSchema.optional(),
  include: ReasonIncludeSchema.optional(),
  data: z.union([ ReasonUpdateInputSchema,ReasonUncheckedUpdateInputSchema ]),
  where: ReasonWhereUniqueInputSchema,
}).strict()

export const ReasonUpdateManyArgsSchema: z.ZodType<Prisma.ReasonUpdateManyArgs> = z.object({
  data: z.union([ ReasonUpdateManyMutationInputSchema,ReasonUncheckedUpdateManyInputSchema ]),
  where: ReasonWhereInputSchema.optional(),
}).strict()

export const ReasonDeleteManyArgsSchema: z.ZodType<Prisma.ReasonDeleteManyArgs> = z.object({
  where: ReasonWhereInputSchema.optional(),
}).strict()

export const UserReasonCreateArgsSchema: z.ZodType<Prisma.UserReasonCreateArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  data: z.union([ UserReasonCreateInputSchema,UserReasonUncheckedCreateInputSchema ]),
}).strict()

export const UserReasonUpsertArgsSchema: z.ZodType<Prisma.UserReasonUpsertArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereUniqueInputSchema,
  create: z.union([ UserReasonCreateInputSchema,UserReasonUncheckedCreateInputSchema ]),
  update: z.union([ UserReasonUpdateInputSchema,UserReasonUncheckedUpdateInputSchema ]),
}).strict()

export const UserReasonCreateManyArgsSchema: z.ZodType<Prisma.UserReasonCreateManyArgs> = z.object({
  data: z.union([ UserReasonCreateManyInputSchema,UserReasonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserReasonDeleteArgsSchema: z.ZodType<Prisma.UserReasonDeleteArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  where: UserReasonWhereUniqueInputSchema,
}).strict()

export const UserReasonUpdateArgsSchema: z.ZodType<Prisma.UserReasonUpdateArgs> = z.object({
  select: UserReasonSelectSchema.optional(),
  include: UserReasonIncludeSchema.optional(),
  data: z.union([ UserReasonUpdateInputSchema,UserReasonUncheckedUpdateInputSchema ]),
  where: UserReasonWhereUniqueInputSchema,
}).strict()

export const UserReasonUpdateManyArgsSchema: z.ZodType<Prisma.UserReasonUpdateManyArgs> = z.object({
  data: z.union([ UserReasonUpdateManyMutationInputSchema,UserReasonUncheckedUpdateManyInputSchema ]),
  where: UserReasonWhereInputSchema.optional(),
}).strict()

export const UserReasonDeleteManyArgsSchema: z.ZodType<Prisma.UserReasonDeleteManyArgs> = z.object({
  where: UserReasonWhereInputSchema.optional(),
}).strict()