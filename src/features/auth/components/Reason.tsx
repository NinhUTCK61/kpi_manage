import { CheckBoxReason } from '@/features/auth/components/CheckBoxReason'
import { api } from '@/libs/api'
import { SignUpFormType } from '@/libs/schema'
import { FormHelperText } from '@/libs/shared/components'
import { Stack, Typography } from '@mui/material'
import { ReasonType } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { Reason } from 'prisma/generated/zod'
import { useFormContext } from 'react-hook-form'

type ReasonPropType = {
  type: ReasonType
}

const ReasonSection: React.FC<ReasonPropType> = ({ type }) => {
  const { t, i18n } = useTranslation(['sign_up', 'common'])
  const { data: reason = [] } = api.reason.list.useQuery()
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<SignUpFormType>()

  const currentLangue = i18n.language === 'en' ? 'text_en' : 'text_ja'

  const hasError = !!(errors as Record<string, unknown>)[type]

  const handleCheckbox = (id: number) => {
    let checkedReasons = getValues().reasons
    if (checkedReasons.includes(id)) {
      checkedReasons = checkedReasons.filter((idReason: number) => {
        return idReason !== id
      })
    } else {
      checkedReasons.push(id)
    }
    setValue('reasons', checkedReasons)
  }

  return (
    <Stack justifyContent="center">
      <Stack justifyContent="center">
        <Typography variant="body1" fontWeight={600}>
          {type === ReasonType.ISSUE ? t('reason_title_issue') : t('reason_title_reason')}
          <Typography ml={0.5} variant="body2" component="span" sx={{ color: 'red !important' }}>
            *
          </Typography>
        </Typography>
        {reason.map((reason: Reason) => {
          return (
            reason.type === type && (
              <Stack key={reason.id} mt={1}>
                <CheckBoxReason
                  label={reason[currentLangue]}
                  reason={reason}
                  onClick={() => handleCheckbox(reason.id)}
                />
              </Stack>
            )
          )
        })}
      </Stack>

      {hasError && (
        <FormHelperText error>
          {type === ReasonType.ISSUE
            ? t('error.kpi_issue_required', { ns: 'common' })
            : t('error.kpi_reason_required', { ns: 'common' })}
        </FormHelperText>
      )}
    </Stack>
  )
}

export { ReasonSection }
