import { greyScale } from '@/common/theme'
import { Input } from '@/components/Form/Input'
import { LayoutUnAuth } from '@/components/Layout'
import { type ForgotPasswordType } from '@/libs/schema'
import { api } from '@/utils/api'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { SubmitHandler, useForm } from 'react-hook-form'

const ForgotPassword: NextPage = () => {
  const router = useRouter()
  const mutation = api.auth.forgotPassword.useMutation()
  const { t } = useTranslation('forgot_password')

  const { control, handleSubmit } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: '',
    },
    // resolver: zodResolver(ForgotPasswordSchema),
  })

  const redirectBack = () => {
    router.push('/sign-in')
  }

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    const { email } = data

    mutation.mutate(
      {
        email,
      },
      {
        onError(error) {
          enqueueSnackbar(`${error.message}`, {
            variant: 'error',
          })
        },
        onSuccess() {
          router.push('/send-mail-success')
        },
      },
    )
  }

  return (
    <LayoutUnAuth title="Forgot Password">
      <Stack width={450} direction="column" margin="auto" mt={10}>
        <Stack alignItems="center" mb={4}>
          <Image src={Logo} alt="logo" />

          <Typography variant="h2" mt={1.5} mb={0.5}>
            {t('title')}
          </Typography>

          <Typography variant="body1" color={greyScale[600]} mb={4}>
            {t('child_title')}
          </Typography>

          <Typography variant="body2" textAlign="center" color={greyScale[600]}>
            {t('child_title_2')}
          </Typography>
        </Stack>

        <Stack width="100%" spacing={2}>
          <Input
            control={control}
            name="email"
            label={t('email') as string}
            fullWidth
            placeholder={t('enter_email') as string}
          />

          <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
            {t('submit')}
          </Button>

          <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
            <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

            <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={redirectBack}>
              {t('back')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { ForgotPassword }
