import { ZodErrorMap, ZodIssue, ZodIssueCode, z } from 'zod'

export const errorMap: ZodErrorMap = (issue, _ctx) => {
  const { message: _message, code, ...rest } = issue
  let message: string
  switch (code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') {
        message = 'error.invalid_value_undefined'
      } else {
        message = `error.invalid_value`
      }
      break
    case ZodIssueCode.invalid_literal:
      message = `error.invalid_literal`
      break
    case ZodIssueCode.unrecognized_keys:
      message = `error.unrecognized_keys`
      break
    case ZodIssueCode.invalid_union:
      message = `error.invalid_union`
      break
    case ZodIssueCode.invalid_union_discriminator:
      message = `error.invalid_union_discriminator`
      break
    case ZodIssueCode.invalid_enum_value:
      message = `error.invalid_enum_value`
      break
    case ZodIssueCode.invalid_arguments:
      message = `error.invalid_arguments`
      break
    case ZodIssueCode.invalid_return_type:
      message = `error.invalid_return_type`
      break
    case ZodIssueCode.invalid_date:
      message = `error.invalid_date`
      break
    case ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        message = `error.invalid_string_email`
      } else {
        message = `error.invalid_string_format`
      }
      break
    case ZodIssueCode.too_small:
      if (issue.type === 'array') {
        message = issue.inclusive ? `error.too_small_array_true` : 'error.too_small_array_false'
      } else if (issue.type === 'string') {
        if (issue.minimum === 1) {
          message = `error.too_small_string1`
        } else {
          message = issue.inclusive
            ? `error.too_small_string_more_true`
            : `error.too_small_string_more_false`
        }
      } else if (issue.type === 'number') {
        message = `${issue.minimum}${
          issue.inclusive ? `error.too_small_number_true` : `error.too_small_number_false`
        }`
      } else {
        message = 'error.invalid_input'
      }
      break
    case ZodIssueCode.too_big:
      if (issue.type === 'array') {
        message = `${issue.inclusive ? `error.too_big_array_true` : `error.too_big_array_false`}`
      } else if (issue.type === 'string') {
        message = `${issue.inclusive ? `error.too_big_string_true` : `error.too_big_string_false`}`
      } else if (issue.type === 'number') {
        message = `${issue.inclusive ? `error.too_big_number_true` : `error.too_big_number_false`}`
      } else {
        message = 'error.too_big_result'
      }
      break
    case ZodIssueCode.custom:
      message = issue.message || ''
      break
    case ZodIssueCode.invalid_intersection_types:
      message = `error.invalid_intersection_types`
      break
    case ZodIssueCode.not_multiple_of:
      message = `error.not_multiple_of`
      break
    case ZodIssueCode.not_finite:
      message = 'error.not_finite'
      break
    default:
      message = _ctx.defaultError
  }
  return { message: message + '|' + JSON.stringify(rest) }
}

export const processIssue = (issue: ZodIssue) => {
  return {
    message: issue.message,
  }
}

z.setErrorMap(errorMap)
