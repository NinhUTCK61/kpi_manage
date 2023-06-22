import { UserProfileType } from '@/libs/schema/profile'
import { Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Control } from 'react-hook-form'
import { BackgroundProfile } from './BackgroundProfile'
import { Input } from './Input'

type FormUpdateProfileTypes = {
  handleSubmit(): void
  control: Control<UserProfileType>
  isLoading: boolean
  handleOpenEdit(): void
  handleCloseEdit(): void
  edit: boolean
}

export const FormProfile: React.FC<FormUpdateProfileTypes> = ({
  control,
  isLoading,
  handleSubmit,
  handleOpenEdit,
  handleCloseEdit,
  edit,
}) => {
  const { t } = useTranslation(['sign_up', 'profile'])

  return (
    <>
      <Stack component="form" width={460} onSubmit={handleSubmit} spacing={2}>
        <BackgroundProfile edit={edit} />

        <Stack direction="row" spacing={2}>
          <Input
            control={control}
            name="first_name"
            label={t('first_name') as string}
            fullWidth
            placeholder={t('enter_first_name') as string}
            readOnly={!edit}
            disabled={isLoading}
            required={edit}
          />

          <Input
            control={control}
            name="name"
            label={t('last_name') as string}
            fullWidth
            placeholder={t('enter_last_name') as string}
            readOnly={!edit}
            disabled={isLoading}
            required={edit}
          />
        </Stack>

        <Input
          control={control}
          name="company_name"
          label={t('company_name', { ns: 'profile' }) as string}
          fullWidth
          placeholder={t('enter_email') as string}
          readOnly={!edit}
          disabled={isLoading}
          required={edit}
        />

        <Input
          control={control}
          name="role_in_company"
          label={t('position') as string}
          fullWidth
          placeholder={t('enter_position') as string}
          readOnly={!edit}
          disabled={isLoading}
          required={edit}
        />

        <Input
          control={control}
          name="email"
          label={t('email') as string}
          fullWidth
          placeholder={t('enter_email') as string}
          readOnly={!edit}
          disabled={isLoading}
          required={edit}
        />

        {!edit ? (
          <Button variant="contained" onClick={handleOpenEdit}>
            {t('edit_profile', { ns: 'profile' })}
          </Button>
        ) : (
          <Stack direction="row" spacing={2} width="100%">
            <Button variant="contained" type="submit" fullWidth onClick={handleCloseEdit}>
              {t('save_changes', { ns: 'profile' })}
            </Button>
            <Button variant="outlined" fullWidth onClick={handleCloseEdit}>
              Cancel
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  )
}
