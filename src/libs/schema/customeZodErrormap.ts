import { z } from 'zod'

export const errorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === 'undefined' || issue.received === 'null') {
        return {
          message: 'error.invalid_value',
        }
      } else {
        return {
          message: `error.invalid_type`,
        }
      }
    case z.ZodIssueCode.unrecognized_keys:
      return {
        message: `error.unrecognized_keys`,
      }
    case z.ZodIssueCode.invalid_union:
      return {
        message: `error.invalid_union`,
      }
    case z.ZodIssueCode.invalid_union_discriminator:
      return {
        message: 'error.invalid_union_discriminator',
      }
    case z.ZodIssueCode.invalid_enum_value:
      return {
        message: `error.invalid_enum_value`,
      }
    case z.ZodIssueCode.invalid_arguments:
      return {
        message: 'error.invalid_arguments',
      }
    case z.ZodIssueCode.invalid_return_type:
      return {
        message: 'error.invalid_return_type',
      }
    case z.ZodIssueCode.invalid_date:
      return {
        message: 'error.invalid_date',
      }
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return {
          message: 'error.invalid_string_email',
          value: issue,
        }
      } else {
        return {
          message: 'error.invalid_string_format',
        }
      }
    case z.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return {
          message: `error.too_small_array`,
        }
      } else if (issue.type === 'string') {
        if (issue.minimum === 1) {
          return {
            message: `error.too_small_string`,
          }
        }
        return {
          message: issue.inclusive
            ? 'error.too_small_string_more_true'
            : `error.too_small_string_more_false`,
        }
      } else if (issue.type === 'number') {
        return {
          message: `${issue.minimum}${
            issue.inclusive ? `error.too_small_number_true` : `error.too_small_number_false`
          }`,
        }
      } else {
        return { message: 'error.too_small_invalid_input' }
      }
    case z.ZodIssueCode.too_big:
      if (issue.type === 'array') {
        return {
          message: `${issue.maximum}${
            issue.inclusive ? `error.too_big_array_true` : `error.too_big_array_false`
          }`,
        }
      } else if (issue.type === 'string') {
        return {
          message: `${
            issue.inclusive ? `error.too_big_string_true` : `error.too_big_string_false`
          }`,
        }
      } else if (issue.type === 'number') {
        return {
          message: `${issue.maximum}${issue.inclusive ? `error.too_big_number_false` : ``}`,
        }
      } else {
        return {
          message: 'error.invalid_input',
        }
      }
    case z.ZodIssueCode.custom:
      return {
        message: `error.invalid_input`,
      }
    case z.ZodIssueCode.invalid_intersection_types:
      return {
        message: `error.invalid_intersection_types`,
      }
    case z.ZodIssueCode.not_multiple_of:
      return {
        message: `error.not_multiple_of`,
      }
    default:
      return { message: ctx.defaultError }
  }
}

z.setErrorMap(errorMap)
