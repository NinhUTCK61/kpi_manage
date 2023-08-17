import { ResetPasswordInputSchema } from '@/libs/schema'
import { Input, PasswordStateValidation } from '@/libs/shared/components'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { Control, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { DescriptionTitle, SubTitle } from '../styled'

type FormResetPasswordTypes = {
  control: Control<z.infer<typeof ResetPasswordInputSchema>>
  handleSubmit(): void
  isLoading: boolean
}

const FormResetPassword: React.FC<FormResetPasswordTypes> = ({
  control,
  handleSubmit,
  isLoading,
}) => {
  const router = useRouter()
  const password = useWatch({ control, name: 'password' })
  const { t } = useTranslation(['reset_password', 'meta'])

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <Stack
      width={{ xs: '100%', sm: 460 }}
      direction="column"
      margin="auto"
      mt={{ xs: 2, sm: 10 }}
      mb={5}
      component="form"
      onSubmit={handleSubmit}
    >
      <Stack alignItems="center" mb={{ xs: 3, sm: 4 }}>
        <Image src={Logo} alt="logo" />

        <SubTitle mt={1.5}>{t('reset_password.title', { ns: 'meta' })}</SubTitle>

        <DescriptionTitle textAlign="center" width={{ xs: '100%', sm: 512 }}>
          {t('title')}
        </DescriptionTitle>
      </Stack>

      <Stack width={{ xs: '100%', sm: 450 }} spacing={2}>
        <Input
          control={control}
          name="password"
          label={t('new_password') as string}
          type="password"
          placeholder={t('enter_new_password') as string}
        />

        <Input
          control={control}
          name="confirmPassword"
          label={t('confirm_password') as string}
          type="password"
          placeholder={t('enter_confirm_password') as string}
        />

        <PasswordStateValidation password={password} />

        <Button
          variant="contained"
          disabled={isLoading}
          sx={{ textTransform: 'capitalize' }}
          type="submit"
        >
          {t('submit')}
        </Button>

        <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
          <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

          <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={redirectSignIn}>
            {t('back')}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export { FormResetPassword }
