import { greyScale } from '@/libs/config/theme'
import { ResetPasswordSchema } from '@/libs/schema'
import { Input } from '@/libs/shared/components/Form/Input'
import { LayoutUnAuth } from '@/libs/shared/components/Layout'
import { PasswordStateValidation } from '@/libs/shared/components/PasswordStateValidation'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowLeft from 'public/assets/svgs/arrow_left.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { Control, useWatch } from 'react-hook-form'
import { z } from 'zod'

type FormResetPasswordTypes = {
  control: Control<z.infer<typeof ResetPasswordSchema>>
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

  const redirectSignIn = () => {
    router.push('/sign-in')
  }
  return (
    <LayoutUnAuth title="Reset Password">
      <Stack
        width={460}
        direction="column"
        margin="auto"
        mt={10}
        component="form"
        onSubmit={handleSubmit}
      >
        <Stack alignItems="center" mb={4}>
          <Image src={Logo} alt="logo" />

          <Typography variant="h2" mt={1.5} mb={0.5}>
            Reset Password
          </Typography>

          <Typography variant="body1" color={greyScale[600]} textAlign="center" width={507}>
            Keep your account secure by changing your password regularly
          </Typography>
        </Stack>

        <Stack width="100%" spacing={2}>
          <Input
            sx={{ width: 450 }}
            control={control}
            name="password"
            label="New password"
            type="password"
            placeholder="enter your new password"
          />

          <Input
            sx={{ width: 450 }}
            control={control}
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="enter your new password"
          />

          <PasswordStateValidation password={password} />

          <Button
            variant="contained"
            disabled={isLoading}
            sx={{ textTransform: 'capitalize', width: 450 }}
            type="submit"
          >
            Submit
          </Button>

          <Stack py={1.5} spacing={0.5} justifyContent="center" alignItems="center" direction="row">
            <Image src={ArrowLeft} alt="arrow-left" style={{ marginRight: '14px' }} />

            <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={redirectSignIn}>
              Back
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </LayoutUnAuth>
  )
}

export { FormResetPassword }
