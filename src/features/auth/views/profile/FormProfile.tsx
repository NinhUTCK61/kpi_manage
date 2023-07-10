import { greyScale } from '@/libs/config/theme'
import { UserProfileType } from '@/libs/schema/profile'
import { Input } from '@/libs/shared/components'
import { Button, Stack, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Control } from 'react-hook-form'

type FormUpdateProfileTypes = {
  handleSubmit(): void
  control: Control<UserProfileType>
  isLoading: boolean
  handleOpenEdit(): void
  handleCancelEdit(): void
  isEdit: boolean
}

export const FormProfile: React.FC<FormUpdateProfileTypes> = ({
  control,
  isLoading,
  handleSubmit,
  handleOpenEdit,
  handleCancelEdit,
  isEdit,
}) => {
  const { t } = useTranslation(['sign_up', 'profile'])

  return (
    <Stack component="form" width={460} onSubmit={handleSubmit} spacing={2}>
      <Stack direction="row" spacing={2}>
        <InputProfile
          control={control}
          name="first_name"
          label={t('first_name') as string}
          fullWidth
          placeholder={t('enter_first_name', { ns: 'profile' }) as string}
          readOnly={!isEdit}
          disabled={isLoading}
          required={isEdit}
        />

        <InputProfile
          control={control}
          name="name"
          label={t('last_name') as string}
          fullWidth
          placeholder={t('enter_last_name', { ns: 'profile' }) as string}
          readOnly={!isEdit}
          disabled={isLoading}
          required={isEdit}
        />
      </Stack>

      <InputProfile
        control={control}
        name="company_name"
        label={t('company_name', { ns: 'profile' }) as string}
        fullWidth
        placeholder={t('enter_company_name') as string}
        readOnly={!isEdit}
        disabled={isLoading}
        required={isEdit}
      />

      <InputProfile
        control={control}
        name="role_in_company"
        label={t('position') as string}
        fullWidth
        placeholder={t('enter_position') as string}
        readOnly={!isEdit}
        disabled={isLoading}
        required={isEdit}
      />

      <InputProfile
        control={control}
        name="email"
        label={t('email') as string}
        fullWidth
        placeholder={t('enter_email') as string}
        readOnly
      />

      {isEdit ? (
        <Stack direction="row" spacing={2} width="100%">
          <Button variant="contained" type="submit" fullWidth>
            {t('save_changes', { ns: 'profile' })}
          </Button>

          <Button variant="outlined" fullWidth onClick={handleCancelEdit}>
            {t('cancel', { ns: 'profile' })}
          </Button>
        </Stack>
      ) : (
        <Button variant="contained" onClick={handleOpenEdit}>
          {t('edit_profile', { ns: 'profile' })}
        </Button>
      )}
    </Stack>
  )
}

const InputProfile = styled(Input)({
  '&.Mui-readOnly': {
    backgroundColor: greyScale[300],
    pointerEvents: 'none',
  },
  '&.Mui-readOnly fieldset': {
    border: 'none',
  },
})
