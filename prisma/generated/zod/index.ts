import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const CommentScalarFieldEnumSchema = z.enum(['id','nodeId','comment','userId','rep_to_comment_id','x','y']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const NodeScalarFieldEnumSchema = z.enum(['id','level','child_no','slug','input_title','input_value','is_formula','value2number','title_style','input_value_style','bg_color','x','y','unit','templateId','parent_node_id']);

export const PasswordResetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','updated_at']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TemplateScalarFieldEnumSchema = z.enum(['id','root_note_id','name','image_url','public_url','created_at','updated_at','deleted_at']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','password']);

export const UserTemplateScalarFieldEnumSchema = z.enum(['id','userId','template_id','is_owner','is_favorite','can_edit','created_at','updated_at']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);
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
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  password: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  nodeId: z.string(),
  comment: z.string().nullable(),
  userId: z.string().nullable(),
  rep_to_comment_id: z.string().nullable(),
  x: z.number(),
  y: z.number(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// USER TEMPLATE SCHEMA
/////////////////////////////////////////

export const UserTemplateSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
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
  deleted_at: z.boolean(),
})

export type Template = z.infer<typeof TemplateSchema>

/////////////////////////////////////////
// NODE SCHEMA
/////////////////////////////////////////

export const NodeSchema = z.object({
  id: z.string().cuid(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean(),
  value2number: z.string(),
  title_style: InputJsonValue,
  input_value_style: InputJsonValue,
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  templateId: z.string(),
  parent_node_id: z.string(),
})

export type Node = z.infer<typeof NodeSchema>

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
  userTemplate: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  PasswordReset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
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
  userTemplate: z.boolean().optional(),
  comment: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  password: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  userTemplate: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  PasswordReset: z.union([z.boolean(),z.lazy(() => PasswordResetArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  childrens: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  rep_to_comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
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
  childrens: z.boolean().optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  nodeId: z.boolean().optional(),
  comment: z.boolean().optional(),
  userId: z.boolean().optional(),
  rep_to_comment_id: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  childrens: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  rep_to_comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER TEMPLATE
//------------------------------------------------------

export const UserTemplateIncludeSchema: z.ZodType<Prisma.UserTemplateInclude> = z.object({
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserTemplateArgsSchema: z.ZodType<Prisma.UserTemplateArgs> = z.object({
  select: z.lazy(() => UserTemplateSelectSchema).optional(),
  include: z.lazy(() => UserTemplateIncludeSchema).optional(),
}).strict();

export const UserTemplateSelectSchema: z.ZodType<Prisma.UserTemplateSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  template_id: z.boolean().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TEMPLATE
//------------------------------------------------------

export const TemplateIncludeSchema: z.ZodType<Prisma.TemplateInclude> = z.object({
  userTemplate: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
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
  userTemplate: z.boolean().optional(),
  node: z.boolean().optional(),
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
  userTemplate: z.union([z.boolean(),z.lazy(() => UserTemplateFindManyArgsSchema)]).optional(),
  node: z.union([z.boolean(),z.lazy(() => NodeFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NODE
//------------------------------------------------------

export const NodeIncludeSchema: z.ZodType<Prisma.NodeInclude> = z.object({
  Template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  node_child: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  parent_node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
}).strict()

export const NodeArgsSchema: z.ZodType<Prisma.NodeArgs> = z.object({
  select: z.lazy(() => NodeSelectSchema).optional(),
  include: z.lazy(() => NodeIncludeSchema).optional(),
}).strict();

export const NodeSelectSchema: z.ZodType<Prisma.NodeSelect> = z.object({
  id: z.boolean().optional(),
  level: z.boolean().optional(),
  child_no: z.boolean().optional(),
  slug: z.boolean().optional(),
  input_title: z.boolean().optional(),
  input_value: z.boolean().optional(),
  is_formula: z.boolean().optional(),
  value2number: z.boolean().optional(),
  title_style: z.boolean().optional(),
  input_value_style: z.boolean().optional(),
  bg_color: z.boolean().optional(),
  x: z.boolean().optional(),
  y: z.boolean().optional(),
  unit: z.boolean().optional(),
  templateId: z.boolean().optional(),
  parent_node_id: z.boolean().optional(),
  Template: z.union([z.boolean(),z.lazy(() => TemplateArgsSchema)]).optional(),
  node_child: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
  parent_node: z.union([z.boolean(),z.lazy(() => NodeArgsSchema)]).optional(),
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
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateListRelationFilterSchema).optional(),
  comment: z.lazy(() => CommentListRelationFilterSchema).optional(),
  PasswordReset: z.union([ z.lazy(() => PasswordResetRelationFilterSchema),z.lazy(() => PasswordResetWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateOrderByRelationAggregateInputSchema).optional(),
  comment: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
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
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  childrens: z.lazy(() => CommentListRelationFilterSchema).optional(),
  rep_to_comment: z.union([ z.lazy(() => CommentRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rep_to_comment_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  childrens: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rep_to_comment_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
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
  nodeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserTemplateWhereInputSchema: z.ZodType<Prisma.UserTemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTemplateWhereInputSchema),z.lazy(() => UserTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTemplateWhereInputSchema),z.lazy(() => UserTemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_owner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_favorite: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_edit: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserTemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.UserTemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserTemplateWhereUniqueInputSchema: z.ZodType<Prisma.UserTemplateWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const UserTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
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
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  deleted_at: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userTemplate: z.lazy(() => UserTemplateListRelationFilterSchema).optional(),
  node: z.lazy(() => NodeListRelationFilterSchema).optional()
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
  userTemplate: z.lazy(() => UserTemplateOrderByRelationAggregateInputSchema).optional(),
  node: z.lazy(() => NodeOrderByRelationAggregateInputSchema).optional()
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
  deleted_at: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const NodeWhereInputSchema: z.ZodType<Prisma.NodeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NodeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NodeWhereInputSchema),z.lazy(() => NodeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  child_no: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_formula: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  value2number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title_style: z.lazy(() => JsonFilterSchema).optional(),
  input_value_style: z.lazy(() => JsonFilterSchema).optional(),
  bg_color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Template: z.union([ z.lazy(() => TemplateRelationFilterSchema),z.lazy(() => TemplateWhereInputSchema) ]).optional().nullable(),
  node_child: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
  parent_node: z.union([ z.lazy(() => NodeRelationFilterSchema),z.lazy(() => NodeWhereInputSchema) ]).optional().nullable(),
}).strict();

export const NodeOrderByWithRelationInputSchema: z.ZodType<Prisma.NodeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  child_no: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  title_style: z.lazy(() => SortOrderSchema).optional(),
  input_value_style: z.lazy(() => SortOrderSchema).optional(),
  bg_color: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional(),
  Template: z.lazy(() => TemplateOrderByWithRelationInputSchema).optional(),
  node_child: z.lazy(() => NodeOrderByWithRelationInputSchema).optional(),
  parent_node: z.lazy(() => NodeOrderByWithRelationInputSchema).optional()
}).strict();

export const NodeWhereUniqueInputSchema: z.ZodType<Prisma.NodeWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  parent_node_id: z.string().optional()
}).strict();

export const NodeOrderByWithAggregationInputSchema: z.ZodType<Prisma.NodeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  child_no: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  title_style: z.lazy(() => SortOrderSchema).optional(),
  input_value_style: z.lazy(() => SortOrderSchema).optional(),
  bg_color: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
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
  level: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  child_no: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  is_formula: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  value2number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title_style: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  input_value_style: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  bg_color: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentInputSchema).optional(),
  childrens: z.lazy(() => CommentCreateNestedManyWithoutRep_to_commentInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentCreateNestedOneWithoutChildrensInputSchema).optional()
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  rep_to_comment_id: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  childrens: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRep_to_commentInputSchema).optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCommentNestedInputSchema).optional(),
  childrens: z.lazy(() => CommentUpdateManyWithoutRep_to_commentNestedInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentUpdateOneWithoutChildrensNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  childrens: z.lazy(() => CommentUncheckedUpdateManyWithoutRep_to_commentNestedInputSchema).optional()
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  rep_to_comment_id: z.string().optional().nullable(),
  x: z.number(),
  y: z.number()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateInputSchema: z.ZodType<Prisma.UserTemplateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  template: z.lazy(() => TemplateCreateNestedOneWithoutUserTemplateInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutUserTemplateInputSchema)
}).strict();

export const UserTemplateUncheckedCreateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
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
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutUserTemplateNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutUserTemplateNestedInputSchema).optional()
}).strict();

export const UserTemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateManyInputSchema: z.ZodType<Prisma.UserTemplateCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
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
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TemplateCreateInputSchema: z.ZodType<Prisma.TemplateCreateInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUpdateInputSchema: z.ZodType<Prisma.TemplateUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateCreateManyInputSchema: z.ZodType<Prisma.TemplateCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional()
}).strict();

export const TemplateUpdateManyMutationInputSchema: z.ZodType<Prisma.TemplateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TemplateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeCreateInputSchema: z.ZodType<Prisma.NodeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  Template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  node_child: z.lazy(() => NodeCreateNestedOneWithoutParent_nodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutNode_childInputSchema).optional()
}).strict();

export const NodeUncheckedCreateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  templateId: z.string(),
  parent_node_id: z.string(),
  node_child: z.lazy(() => NodeUncheckedCreateNestedOneWithoutParent_nodeInputSchema).optional()
}).strict();

export const NodeUpdateInputSchema: z.ZodType<Prisma.NodeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  node_child: z.lazy(() => NodeUpdateOneWithoutParent_nodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutNode_childNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_child: z.lazy(() => NodeUncheckedUpdateOneWithoutParent_nodeNestedInputSchema).optional()
}).strict();

export const NodeCreateManyInputSchema: z.ZodType<Prisma.NodeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  templateId: z.string(),
  parent_node_id: z.string()
}).strict();

export const NodeUpdateManyMutationInputSchema: z.ZodType<Prisma.NodeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutPasswordResetInputSchema)
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
  user: z.lazy(() => UserUpdateOneRequiredWithoutPasswordResetNestedInputSchema).optional()
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

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
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
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
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
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
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
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
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
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
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
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
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
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
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
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
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
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
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

export const PasswordResetRelationFilterSchema: z.ZodType<Prisma.PasswordResetRelationFilter> = z.object({
  is: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PasswordResetWhereInputSchema).optional().nullable()
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

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
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
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const CommentRelationFilterSchema: z.ZodType<Prisma.CommentRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional().nullable()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rep_to_comment_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommentAvgOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rep_to_comment_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nodeId: z.lazy(() => SortOrderSchema).optional(),
  comment: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  rep_to_comment_id: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommentSumOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
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

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const TemplateRelationFilterSchema: z.ZodType<Prisma.TemplateRelationFilter> = z.object({
  is: z.lazy(() => TemplateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TemplateWhereInputSchema).optional().nullable()
}).strict();

export const UserTemplateCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTemplateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  is_owner: z.lazy(() => SortOrderSchema).optional(),
  is_favorite: z.lazy(() => SortOrderSchema).optional(),
  can_edit: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserTemplateMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserTemplateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
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

export const NodeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NodeOrderByRelationAggregateInput> = z.object({
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

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NodeRelationFilterSchema: z.ZodType<Prisma.NodeRelationFilter> = z.object({
  is: z.lazy(() => NodeWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => NodeWhereInputSchema).optional().nullable()
}).strict();

export const NodeCountOrderByAggregateInputSchema: z.ZodType<Prisma.NodeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  child_no: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  title_style: z.lazy(() => SortOrderSchema).optional(),
  input_value_style: z.lazy(() => SortOrderSchema).optional(),
  bg_color: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.NodeAvgOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  child_no: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  bg_color: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeMinOrderByAggregateInputSchema: z.ZodType<Prisma.NodeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  level: z.lazy(() => SortOrderSchema).optional(),
  child_no: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  input_title: z.lazy(() => SortOrderSchema).optional(),
  input_value: z.lazy(() => SortOrderSchema).optional(),
  is_formula: z.lazy(() => SortOrderSchema).optional(),
  value2number: z.lazy(() => SortOrderSchema).optional(),
  bg_color: z.lazy(() => SortOrderSchema).optional(),
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  parent_node_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NodeSumOrderByAggregateInputSchema: z.ZodType<Prisma.NodeSumOrderByAggregateInput> = z.object({
  x: z.lazy(() => SortOrderSchema).optional(),
  y: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
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
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
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
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
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

export const CommentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
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

export const CommentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordResetCreateWithoutUserInputSchema),z.lazy(() => PasswordResetUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PasswordResetCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => PasswordResetWhereUniqueInputSchema).optional()
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

export const CommentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
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

export const CommentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentCreateWithoutUserInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
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

export const UserCreateNestedOneWithoutCommentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentCreateNestedManyWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutRep_to_commentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyRep_to_commentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedOneWithoutChildrensInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutChildrensInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrensInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict();

export const CommentUncheckedCreateNestedManyWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutRep_to_commentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyRep_to_commentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneWithoutCommentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentInputSchema) ]).optional(),
}).strict();

export const CommentUpdateManyWithoutRep_to_commentNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutRep_to_commentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutRep_to_commentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyRep_to_commentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutRep_to_commentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutRep_to_commentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateOneWithoutChildrensNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutChildrensNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrensInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutChildrensInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrensInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutRep_to_commentNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutRep_to_commentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutRep_to_commentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutRep_to_commentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyRep_to_commentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutRep_to_commentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutRep_to_commentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutRep_to_commentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TemplateCreateNestedOneWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutUserTemplateInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUserTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutUserTemplateInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserTemplateInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTemplateInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const TemplateUpdateOneRequiredWithoutUserTemplateNestedInputSchema: z.ZodType<Prisma.TemplateUpdateOneRequiredWithoutUserTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUserTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutUserTemplateInputSchema).optional(),
  upsert: z.lazy(() => TemplateUpsertWithoutUserTemplateInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TemplateUpdateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutUserTemplateInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutUserTemplateNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTemplateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserTemplateInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserTemplateInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTemplateInputSchema) ]).optional(),
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

export const TemplateCreateNestedOneWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateNestedOneWithoutNodeInput> = z.object({
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TemplateCreateOrConnectWithoutNodeInputSchema).optional(),
  connect: z.lazy(() => TemplateWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutParent_nodeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeCreateNestedOneWithoutNode_childInputSchema: z.ZodType<Prisma.NodeCreateNestedOneWithoutNode_childInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedCreateWithoutNode_childInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutNode_childInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
}).strict();

export const NodeUncheckedCreateNestedOneWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateNestedOneWithoutParent_nodeInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional()
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

export const NodeUpdateOneWithoutParent_nodeNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneWithoutParent_nodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutParent_nodeInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParent_nodeInputSchema) ]).optional(),
}).strict();

export const NodeUpdateOneWithoutNode_childNestedInputSchema: z.ZodType<Prisma.NodeUpdateOneWithoutNode_childNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedCreateWithoutNode_childInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutNode_childInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutNode_childInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutNode_childInputSchema) ]).optional(),
}).strict();

export const NodeUncheckedUpdateOneWithoutParent_nodeNestedInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateOneWithoutParent_nodeNestedInput> = z.object({
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NodeCreateOrConnectWithoutParent_nodeInputSchema).optional(),
  upsert: z.lazy(() => NodeUpsertWithoutParent_nodeInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => NodeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NodeUpdateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParent_nodeInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPasswordResetNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordResetNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasswordResetInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordResetInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
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
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
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
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
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
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
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
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
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
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
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
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
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
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
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

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
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

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
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
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
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
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
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
  template: z.lazy(() => TemplateCreateNestedOneWithoutUserTemplateInputSchema)
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

export const CommentCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  childrens: z.lazy(() => CommentCreateNestedManyWithoutRep_to_commentInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentCreateNestedOneWithoutChildrensInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  rep_to_comment_id: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  childrens: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRep_to_commentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyUserInputSchema),z.lazy(() => CommentCreateManyUserInputSchema).array() ]),
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
  data: z.union([ z.lazy(() => UserTemplateUpdateManyMutationInputSchema),z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserTemplateInputSchema) ]),
}).strict();

export const UserTemplateScalarWhereInputSchema: z.ZodType<Prisma.UserTemplateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserTemplateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserTemplateScalarWhereInputSchema),z.lazy(() => UserTemplateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_owner: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  is_favorite: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_edit: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutUserInputSchema),z.lazy(() => CommentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutUserInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutCommentInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nodeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
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

export const UserCreateWithoutCommentInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const CommentCreateWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentCreateWithoutRep_to_commentInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentInputSchema).optional(),
  childrens: z.lazy(() => CommentCreateNestedManyWithoutRep_to_commentInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRep_to_commentInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  childrens: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRep_to_commentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRep_to_commentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema) ]),
}).strict();

export const CommentCreateManyRep_to_commentInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyRep_to_commentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyRep_to_commentInputSchema),z.lazy(() => CommentCreateManyRep_to_commentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutChildrensInputSchema: z.ZodType<Prisma.CommentCreateWithoutChildrensInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  x: z.number(),
  y: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutCommentInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentCreateNestedOneWithoutChildrensInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutChildrensInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutChildrensInput> = z.object({
  id: z.string().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  rep_to_comment_id: z.string().optional().nullable(),
  x: z.number(),
  y: z.number()
}).strict();

export const CommentCreateOrConnectWithoutChildrensInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutChildrensInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrensInputSchema) ]),
}).strict();

export const UserUpsertWithoutCommentInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentUpsertWithWhereUniqueWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutRep_to_commentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRep_to_commentInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRep_to_commentInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutRep_to_commentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutRep_to_commentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRep_to_commentInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutRep_to_commentInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutChildrensInputSchema) ]),
}).strict();

export const CommentUpsertWithoutChildrensInputSchema: z.ZodType<Prisma.CommentUpsertWithoutChildrensInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrensInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrensInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrensInputSchema) ]),
}).strict();

export const CommentUpdateWithoutChildrensInputSchema: z.ZodType<Prisma.CommentUpdateWithoutChildrensInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCommentNestedInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentUpdateOneWithoutChildrensNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutChildrensInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutChildrensInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TemplateCreateWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateCreateWithoutUserTemplateInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  node: z.lazy(() => NodeCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutUserTemplateInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  node: z.lazy(() => NodeUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutUserTemplateInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUserTemplateInputSchema) ]),
}).strict();

export const UserCreateWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserCreateWithoutUserTemplateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserTemplateInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserTemplateInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTemplateInputSchema) ]),
}).strict();

export const TemplateUpsertWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateUpsertWithoutUserTemplateInput> = z.object({
  update: z.union([ z.lazy(() => TemplateUpdateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedUpdateWithoutUserTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => TemplateCreateWithoutUserTemplateInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutUserTemplateInputSchema) ]),
}).strict();

export const TemplateUpdateWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateUpdateWithoutUserTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  node: z.lazy(() => NodeUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutUserTemplateInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutUserTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  node: z.lazy(() => NodeUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserTemplateInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserTemplateInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserTemplateInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  PasswordReset: z.lazy(() => PasswordResetUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserTemplateCreateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutUserTemplateInputSchema)
}).strict();

export const UserTemplateUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
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
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  node_child: z.lazy(() => NodeCreateNestedOneWithoutParent_nodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutNode_childInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  parent_node_id: z.string(),
  node_child: z.lazy(() => NodeUncheckedCreateNestedOneWithoutParent_nodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutTemplateInputSchema),z.lazy(() => NodeUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const NodeCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.NodeCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NodeCreateManyTemplateInputSchema),z.lazy(() => NodeCreateManyTemplateInputSchema).array() ]),
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
  data: z.union([ z.lazy(() => UserTemplateUpdateManyMutationInputSchema),z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserTemplateInputSchema) ]),
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
  level: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  child_no: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  input_value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  is_formula: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  value2number: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title_style: z.lazy(() => JsonFilterSchema).optional(),
  input_value_style: z.lazy(() => JsonFilterSchema).optional(),
  bg_color: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  x: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  y: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  templateId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  parent_node_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TemplateCreateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateUncheckedCreateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUncheckedCreateWithoutNodeInput> = z.object({
  id: z.string().optional(),
  root_note_id: z.string(),
  name: z.string(),
  image_url: z.string().optional().nullable(),
  public_url: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  deleted_at: z.boolean().optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutTemplateInputSchema).optional()
}).strict();

export const TemplateCreateOrConnectWithoutNodeInputSchema: z.ZodType<Prisma.TemplateCreateOrConnectWithoutNodeInput> = z.object({
  where: z.lazy(() => TemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TemplateCreateWithoutNodeInputSchema),z.lazy(() => TemplateUncheckedCreateWithoutNodeInputSchema) ]),
}).strict();

export const NodeCreateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateWithoutParent_nodeInput> = z.object({
  id: z.string().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  Template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  node_child: z.lazy(() => NodeCreateNestedOneWithoutParent_nodeInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutParent_nodeInput> = z.object({
  id: z.string().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  templateId: z.string(),
  node_child: z.lazy(() => NodeUncheckedCreateNestedOneWithoutParent_nodeInputSchema).optional()
}).strict();

export const NodeCreateOrConnectWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutParent_nodeInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]),
}).strict();

export const NodeCreateWithoutNode_childInputSchema: z.ZodType<Prisma.NodeCreateWithoutNode_childInput> = z.object({
  id: z.string().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  Template: z.lazy(() => TemplateCreateNestedOneWithoutNodeInputSchema).optional(),
  parent_node: z.lazy(() => NodeCreateNestedOneWithoutNode_childInputSchema).optional()
}).strict();

export const NodeUncheckedCreateWithoutNode_childInputSchema: z.ZodType<Prisma.NodeUncheckedCreateWithoutNode_childInput> = z.object({
  id: z.string().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  templateId: z.string(),
  parent_node_id: z.string()
}).strict();

export const NodeCreateOrConnectWithoutNode_childInputSchema: z.ZodType<Prisma.NodeCreateOrConnectWithoutNode_childInput> = z.object({
  where: z.lazy(() => NodeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NodeCreateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedCreateWithoutNode_childInputSchema) ]),
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
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const TemplateUncheckedUpdateWithoutNodeInputSchema: z.ZodType<Prisma.TemplateUncheckedUpdateWithoutNodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  root_note_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  public_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpsertWithoutParent_nodeInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutParent_nodeInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutParent_nodeInputSchema),z.lazy(() => NodeUncheckedCreateWithoutParent_nodeInputSchema) ]),
}).strict();

export const NodeUpdateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUpdateWithoutParent_nodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  node_child: z.lazy(() => NodeUpdateOneWithoutParent_nodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutParent_nodeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutParent_nodeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_child: z.lazy(() => NodeUncheckedUpdateOneWithoutParent_nodeNestedInputSchema).optional()
}).strict();

export const NodeUpsertWithoutNode_childInputSchema: z.ZodType<Prisma.NodeUpsertWithoutNode_childInput> = z.object({
  update: z.union([ z.lazy(() => NodeUpdateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedUpdateWithoutNode_childInputSchema) ]),
  create: z.union([ z.lazy(() => NodeCreateWithoutNode_childInputSchema),z.lazy(() => NodeUncheckedCreateWithoutNode_childInputSchema) ]),
}).strict();

export const NodeUpdateWithoutNode_childInputSchema: z.ZodType<Prisma.NodeUpdateWithoutNode_childInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Template: z.lazy(() => TemplateUpdateOneWithoutNodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutNode_childNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutNode_childInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutNode_childInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserCreateWithoutPasswordResetInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordResetInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordResetInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetInputSchema) ]),
}).strict();

export const UserUpsertWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasswordResetInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordResetInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordResetInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordResetInputSchema) ]),
}).strict();

export const UserUpdateWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasswordResetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPasswordResetInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasswordResetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  userTemplate: z.lazy(() => UserTemplateUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
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

export const CommentCreateManyUserInputSchema: z.ZodType<Prisma.CommentCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  rep_to_comment_id: z.string().optional().nullable(),
  x: z.number(),
  y: z.number()
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
  template: z.lazy(() => TemplateUpdateOneRequiredWithoutUserTemplateNestedInputSchema).optional()
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

export const UserTemplateUncheckedUpdateManyWithoutUserTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateManyWithoutUserTemplateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  childrens: z.lazy(() => CommentUpdateManyWithoutRep_to_commentNestedInputSchema).optional(),
  rep_to_comment: z.lazy(() => CommentUpdateOneWithoutChildrensNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  childrens: z.lazy(() => CommentUncheckedUpdateManyWithoutRep_to_commentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutCommentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutCommentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rep_to_comment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyRep_to_commentInputSchema: z.ZodType<Prisma.CommentCreateManyRep_to_commentInput> = z.object({
  id: z.string().cuid().optional(),
  nodeId: z.string(),
  comment: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  x: z.number(),
  y: z.number()
}).strict();

export const CommentUpdateWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUpdateWithoutRep_to_commentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutCommentNestedInputSchema).optional(),
  childrens: z.lazy(() => CommentUpdateManyWithoutRep_to_commentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutRep_to_commentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRep_to_commentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  childrens: z.lazy(() => CommentUncheckedUpdateManyWithoutRep_to_commentNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutChildrensInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutChildrensInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nodeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserTemplateCreateManyTemplateInputSchema: z.ZodType<Prisma.UserTemplateCreateManyTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  is_owner: z.boolean().optional(),
  is_favorite: z.boolean().optional(),
  can_edit: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const NodeCreateManyTemplateInputSchema: z.ZodType<Prisma.NodeCreateManyTemplateInput> = z.object({
  id: z.string().cuid().optional(),
  level: z.string(),
  child_no: z.string(),
  slug: z.string(),
  input_title: z.string(),
  input_value: z.string(),
  is_formula: z.boolean().optional(),
  value2number: z.string(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  bg_color: z.string(),
  x: z.number(),
  y: z.number(),
  unit: z.string(),
  parent_node_id: z.string()
}).strict();

export const UserTemplateUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutUserTemplateNestedInputSchema).optional()
}).strict();

export const UserTemplateUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.UserTemplateUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_owner: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  is_favorite: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_edit: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NodeUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_child: z.lazy(() => NodeUpdateOneWithoutParent_nodeNestedInputSchema).optional(),
  parent_node: z.lazy(() => NodeUpdateOneWithoutNode_childNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  node_child: z.lazy(() => NodeUncheckedUpdateOneWithoutParent_nodeNestedInputSchema).optional()
}).strict();

export const NodeUncheckedUpdateManyWithoutNodeInputSchema: z.ZodType<Prisma.NodeUncheckedUpdateManyWithoutNodeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  level: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  child_no: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  input_value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  is_formula: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  value2number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  input_value_style: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  bg_color: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  x: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  y: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  parent_node_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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