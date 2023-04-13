import { ZodErrorMap, ZodIssueCode, z } from 'zod'

export const errorMap: ZodErrorMap = (issue, _ctx) => {
  const { message, code, ...rest } = issue
  let message1: string
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') {
        message1 = 'error.invalid_value_undefined'
      } else {
        message1 = `error.invalid_value`
      }
      break
    case ZodIssueCode.invalid_literal:
      message1 = `error.invalid_literal`
      break
    case ZodIssueCode.unrecognized_keys:
      message1 = `error.unrecognized_keys`
      break
    case ZodIssueCode.invalid_union:
      message1 = `error.invalid_union`
      break
    case ZodIssueCode.invalid_union_discriminator:
      message1 = `error.invalid_union_discriminator`
      break
    case ZodIssueCode.invalid_enum_value:
      message1 = `error.invalid_enum_value`
      break
    case ZodIssueCode.invalid_arguments:
      message1 = `error.invalid_arguments`
      break
    case ZodIssueCode.invalid_return_type:
      message1 = `error.invalid_return_type`
      break
    case ZodIssueCode.invalid_date:
      message1 = `error.invalid_date`
      break
    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        message1 = `error.invalid_string_email`
      } else {
        message1 = `error.invalid_string_format`
      }
      break
    case ZodIssueCode.too_small:
      if (issue.type === 'array') {
        message1 = issue.inclusive ? `error.too_small_array_true` : 'error.too_small_array_false'
      } else if (issue.type === 'string') {
        if (issue.minimum === 1) {
          message1 = `error.too_small_string1`
        } else {
          message1 = issue.inclusive
            ? `error.too_small_string_more_true`
            : `error.too_small_string_more_false`
        }
      } else if (issue.type === 'number') {
        message1 = `${issue.minimum}${
          issue.inclusive ? `error.too_small_number_true` : `error.too_small_number_false`
        }`
      } else {
        message1 = 'error.invalid_input'
      }
      break
    case ZodIssueCode.too_big:
      if (issue.type === 'array') {
        message1 = `${issue.maximum}${
          issue.inclusive ? `error.too_big_array_true` : `error.too_big_array_false`
        }`
      } else if (issue.type === 'string') {
        message1 = `${issue.inclusive ? `error.too_big_string_true` : `error.too_big_string_false`}`
      } else if (issue.type === 'number') {
        message1 = `${issue.maximum}${
          issue.inclusive ? `error.too_big_number_true` : `error.too_big_number_false`
        }`
      } else {
        message1 = 'error.too_big_result'
      }
      break
    case ZodIssueCode.custom:
      message1 = `erro.invalid_string_format`
      break
    case ZodIssueCode.invalid_intersection_types:
      message1 = `error.invalid_intersection_types`
      break
    case ZodIssueCode.not_multiple_of:
      message1 = `error.not_multiple_of`
      break
    case ZodIssueCode.not_finite:
      message1 = 'error.not_finite'
      break
    default:
      message1 = _ctx.defaultError
  }
  return { message: message1 + '|' + JSON.stringify(rest) }
}
z.setErrorMap(errorMap)
