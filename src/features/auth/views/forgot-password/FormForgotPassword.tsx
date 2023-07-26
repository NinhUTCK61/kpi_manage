import { ForgotPasswordInputSchema } from '@/libs/schema'
import { Input } from '@/libs/shared/components'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { ChildTitle, Title } from '../sign-up'

type FormForgotPasswordTypes = {
  control: Control<z.infer<typeof ForgotPasswordInputSchema>>
  handleSubmit(): void
  isLoading: boolean
}

const FormForgotPassword: React.FC<FormForgotPasswordTypes> = ({
  control,
  handleSubmit,
  isLoading,
}) => {
  const router = useRouter()
  const { t } = useTranslation(['forgot_password'])

  const redirectBack = () => {
    router.push('/sign-in')
  }
  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        width={{ xs: '100%', sm: 450 }}
        direction="column"
        margin="auto"
        mt={{ xs: 2, sm: 10 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack alignItems="center" mb={{ xs: 2, sm: 4 }}>
          <Image src={Logo} alt="logo" />

          <Title mt={1.5}>{t('title') as string}</Title>

          <ChildTitle mb={{ xs: 3, sm: 4 }}>{t('child_title') as string}</ChildTitle>

          <ChildTitle textAlign="center">{t('child_title_2') as string}</ChildTitle>
        </Stack>

        <Stack width="100%" spacing={2}>
          <Input
            control={control}
            name="email"
            label={t('email') as string}
            fullWidth
            placeholder={t('enter_email') as string}
            readOnly={isLoading}
          />

          <Button variant="contained" fullWidth type="submit" disabled={isLoading}>
            {t('submit') as string}
          </Button>

          <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
            <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

            <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={redirectBack}>
              {t('back') as string}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export { FormForgotPassword }
