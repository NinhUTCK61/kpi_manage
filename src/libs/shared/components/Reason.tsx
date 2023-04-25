import { api } from '@/libs/api'
import { SignUpFormType } from '@/libs/schema'
import { Stack, Typography } from '@mui/material'
import { ReasonType } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import { Reason } from 'prisma/generated/zod'
import { useFormContext } from 'react-hook-form'
import { CheckBoxReason } from './Form'

type ReasonPropType = {
  type: ReasonType
}

const ReasonSection: React.FC<ReasonPropType> = ({ type }) => {
  const { t, i18n } = useTranslation(['sign_up'])
  const { data: reason = [] } = api.reason.list.useQuery()
  const { getValues, setValue } = useFormContext<SignUpFormType>()

  const currentLangue = i18n.language === 'en' ? 'text_en' : 'text_ja'

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
        </Typography>
        {reason.map((reason: Reason) => {
          return (
            reason.type === type && (
              <Stack key={reason.id} mt={1}>
                <CheckBoxReason
                  label={reason[currentLangue]}
                  reason={reason}
                  onClick={handleCheckbox}
                />
              </Stack>
            )
          )
        })}
      </Stack>
    </Stack>
  )
}

export { ReasonSection }
