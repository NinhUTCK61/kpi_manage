import { TextColor } from '@/components'
import { Input } from '@/components/Form/Input'
import { SignUpSchema } from '@/libs/schema'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import AlertIcon from 'public/assets/svgs/alert.svg'
import Hand1 from 'public/assets/svgs/hand1.svg'
import Hand2 from 'public/assets/svgs/hand2.svg'
import Hand3 from 'public/assets/svgs/hand3.svg'
import Logo from 'public/assets/svgs/logo.svg'
import AlertCheckedIcon from 'public/assets/svgs/success.svg'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { CustomImage } from './Image'

type FormSignUpTypes = {
  control: Control<z.infer<typeof SignUpSchema>>
  handleSubmit(): void
  isLoading: boolean
  redirectSignIn(): void
  listTextValidate: {
    id: string
    active: boolean
    text: string
  }[]
}

const FormSignUp: React.FC<FormSignUpTypes> = ({
  control,
  handleSubmit,
  isLoading,
  redirectSignIn,
  listTextValidate,
}) => {
  const { t } = useTranslation('sign_up')

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
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
          <Typography variant="h2" fontWeight={700} sx={{ marginBottom: '4px' }}>
            {t('title')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.greyScale[600],
              fontWeight: 400,
            }}
          >
            {t('child_title')}
          </Typography>
        </Stack>

        <Stack width={{ xs: '100%', md: 460 }} spacing={2}>
          <Input
            control={control}
            name="name"
            label="Your name"
            fullWidth
            placeholder="Enter your name"
            onKeyPress={handleKeyPress}
            readOnly={isLoading}
          />
          <Input
            control={control}
            name="email"
            label="Email"
            fullWidth
            placeholder="Enter your email"
            onKeyPress={handleKeyPress}
            readOnly={isLoading}
          />
          <Input
            control={control}
            name="password"
            label="Password"
            type="password"
            fullWidth
            placeholder="Enter your password"
            onKeyPress={handleKeyPress}
            readOnly={isLoading}
          />

          <Stack spacing={1.5}>
            {listTextValidate.map((e) => (
              <Stack key={e.id} direction="row" spacing={7 / 9} alignItems="center">
                <Image src={e.active ? AlertCheckedIcon : AlertIcon} alt="alert" />
                <Typography color="greyScale.700" variant="body2">
                  {e.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Button fullWidth variant="contained" disabled={isLoading} onClick={handleSubmit}>
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
            <TextColor variant="body2" fontWeight={400}>
              {t('sign_in')}
            </TextColor>
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
