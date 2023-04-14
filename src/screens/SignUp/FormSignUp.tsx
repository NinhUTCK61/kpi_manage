import { SignUpSchema } from '@/libs/schema'
import { TextColor } from '@/libs/shared/components'
import { Input } from '@/libs/shared/components/Form/Input'
import { PasswordStateValidation } from '@/libs/shared/components/PasswordStateValidation'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Hand1 from 'public/assets/svgs/hand1.svg'
import Hand2 from 'public/assets/svgs/hand2.svg'
import Hand3 from 'public/assets/svgs/hand3.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { Control, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { CustomImage } from './Image'

type FormSignUpTypes = {
  control: Control<z.infer<typeof SignUpSchema>>
  handleSubmit(): void
  isLoading: boolean
}

const FormSignUp: React.FC<FormSignUpTypes> = ({ control, handleSubmit, isLoading }) => {
  const router = useRouter()
  const { t } = useTranslation(['sign_up'])

  const password = useWatch({ control, name: 'password' })

  const redirectSignIn = () => {
    router.push('/sign-in')
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Stack
        sx={{
          width: 'auto',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mb: 2,
        }}
      >
        <Stack alignItems="center" mb={4}>
          <CustomImage src={Logo} alt="logo" />
          <Typography variant="h2" mb={0.5}>
            {t('title')}
          </Typography>
          <Typography color="greyScale.600">{t('child_title')}</Typography>
        </Stack>

        <Stack width={{ xs: '100%', md: 460 }} component="form" onSubmit={handleSubmit} spacing={2}>
          <Input
            control={control}
            name="name"
            label={t('name') as string}
            fullWidth
            placeholder={t('enter_name') as string}
            readOnly={isLoading}
          />
          <Input
            control={control}
            name="email"
            label={t('email') as string}
            fullWidth
            placeholder={t('enter_email') as string}
            readOnly={isLoading}
          />
          <Input
            control={control}
            name="password"
            label={t('password') as string}
            type="password"
            fullWidth
            placeholder={t('enter_password') as string}
            readOnly={isLoading}
          />

          <PasswordStateValidation password={password} />

          <Button fullWidth variant="contained" disabled={isLoading} type="submit">
            {t('submit')}
          </Button>

          <Stack
            py={1.5}
            spacing={0.5}
            justifyContent="center"
            direction="row"
            onClick={redirectSignIn}
          >
            <Typography variant="body2" color="greyScale.600" fontWeight={400}>
              {t('have_account')}
            </Typography>
            <TextColor>{t('sign_in')}</TextColor>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        alignItems="center"
        sx={{ display: { xs: 'none', md: 'flex' } }}
        spacing={5.25}
        justifyContent="center"
      >
        <Stack direction="row" spacing={5}>
          <Image src={Hand1} alt="hand 1" />
          <Image src={Hand2} alt="hand 2" />
          <Image src={Hand3} alt="hand 3" />
        </Stack>
      </Stack>
    </Stack>
  )
}

export { FormSignUp }
