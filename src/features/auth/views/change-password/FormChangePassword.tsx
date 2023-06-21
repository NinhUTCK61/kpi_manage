import { ChangePasswordType } from '@/libs/schema'
import { Input } from '@/libs/shared/components'
import { Box, Button, Stack, Typography } from '@mui/material'
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
  const { t } = useTranslation('change-password')

  return (
    <Box width={450}>
      <Box mb={3}>
        <Typography variant="h3" fontWeight="700" textTransform="uppercase">
          {t('seo_title')}
        </Typography>
      </Box>

      <Stack width="100%" spacing={2} component="form" onSubmit={handleSubmit}>
        <Input
          control={control}
          name="password"
          label={t('password') as string}
          fullWidth
          placeholder={t('enter_password') as string}
          readOnly={isLoading}
          type="password"
        />

        <Input
          control={control}
          name="newPassword"
          label={t('new_password') as string}
          fullWidth
          placeholder={t('enter_new_password') as string}
          readOnly={isLoading}
          type="password"
        />

        <Input
          control={control}
          name="confirmNewPassword"
          label={t('confirm_password') as string}
          fullWidth
          placeholder={t('enter_new_password') as string}
          readOnly={isLoading}
          type="password"
        />

        <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
          {t('save_change')}
        </Button>
      </Stack>
    </Box>
  )
}

export { FormChangePassword }
