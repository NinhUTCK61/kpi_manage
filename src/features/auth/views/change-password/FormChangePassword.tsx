import { ChangePasswordType } from '@/libs/schema'
import { Input } from '@/libs/shared/components'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Control } from 'react-hook-form'

type FormChangePasswordType = {
  control: Control<ChangePasswordType>
  handleSubmit(): void
  isLoading: boolean
}

const FormChangePassword: React.FC<FormChangePasswordType> = ({
  control,
  handleSubmit,
  isLoading,
}) => {
  const { t } = useTranslation('change_password')

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Input
        control={control}
        name="old-password"
        label={t('password') as string}
        placeholder={t('enter_password') as string}
        autoComplete="current-password"
        readOnly={isLoading}
        type="password"
        fullWidth
      />

      <Input
        control={control}
        name="new-password"
        label={t('new_password') as string}
        placeholder={t('enter_new_password') as string}
        autoComplete="new-password"
        readOnly={isLoading}
        type="password"
        fullWidth
      />

      <Input
        control={control}
        name="confirm-new-password"
        label={t('confirm_password') as string}
        placeholder={t('re_enter_new_password') as string}
        autoComplete="new-password"
        readOnly={isLoading}
        type="password"
        fullWidth
      />

      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {t('save_change')}
      </Button>
    </Stack>
  )
}

export { FormChangePassword }
