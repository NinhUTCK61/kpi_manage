import { greyScale } from '@/libs/config/theme'
import { ForgotPasswordSchema } from '@/libs/schema'
import { Input } from '@/libs/shared/components'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { Control } from 'react-hook-form'
import { z } from 'zod'

type FormForgotPasswordTypes = {
  control: Control<z.infer<typeof ForgotPasswordSchema>>
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
        width={450}
        direction="column"
        margin="auto"
        mt={10}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack alignItems="center" mb={4}>
          <Image src={Logo} alt="logo" />

          <Typography variant="h2" mt={1.5} mb={0.5}>
            {t('title') as string}
          </Typography>

          <Typography variant="body1" color={greyScale[600]} mb={4}>
            {t('child_title') as string}
          </Typography>

          <Typography variant="body2" textAlign="center" color={greyScale[600]}>
            {t('child_title_2') as string}
          </Typography>
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
