import { SignUpSchemaForm } from '@/libs/schema'
import { Reason, ReasonType } from '@prisma/client'

export const getInputType = (reasons: Reason[] = [], input: number[]) => {
  const restReasons = reasons
    .filter((rs) => {
      return input.includes(rs.id)
    })
    .map((rs) => {
      return rs.type
    })
  return restReasons
}
export const createSignUpFormSchema = (reasons: Reason[] = []) =>
  SignUpSchemaForm.refine(
    (data) => {
      const arrType = getInputType(reasons, data.reasons)
      return arrType.includes('ISSUE')
    },
    {
      message: 'reason_issue',
      path: [ReasonType.ISSUE],
    },
  ).refine(
    (data) => {
      const arrType = getInputType(reasons, data.reasons)
      return arrType.includes('REASON_KNOW')
    },
    {
      message: 'reason_know',
      path: [ReasonType.REASON_KNOW],
    },
  )
