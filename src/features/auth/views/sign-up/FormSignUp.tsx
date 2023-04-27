import { ReasonSection } from '@/features/auth/components'
import { SignUpFormType } from '@/libs/schema'
import { DatePickerSeparator, Input } from '@/libs/shared/components'
import { Button, Stack, Typography } from '@mui/material'
import { ReasonType } from '@prisma/client'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import Hand1 from 'public/assets/svgs/hand1.svg'
import Hand2 from 'public/assets/svgs/hand2.svg'
import Hand3 from 'public/assets/svgs/hand3.svg'
import Logo from 'public/assets/svgs/logo.svg'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CustomImage } from '../../components'
import { AcceptLaw } from '../../components/AcceptLaw'

type FormSignUpTypes = {
  handleSubmit(): void
  isLoading: boolean
}

const FormSignUp: React.FC<FormSignUpTypes> = ({ handleSubmit, isLoading }) => {
  const { t } = useTranslation(['sign_up', 'common'])
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormType>()

  const [isAccept, setIsAccept] = useState<boolean>(false)

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
            name="last_name"
            required
            label={t('last_name') as string}
            fullWidth
            placeholder={t('last_name') as string}
            readOnly={isLoading}
          />
          <Input
            control={control}
            name="first_name"
            required
            label={t('first_name') as string}
            fullWidth
            placeholder={t('first_name') as string}
            readOnly={isLoading}
          />
          <Input
            required
            control={control}
            name="email"
            label={t('email') as string}
            fullWidth
            placeholder={t('enter_email') as string}
            readOnly={isLoading}
          />

          <Input
            required
            control={control}
            name="password"
            label={t('password') as string}
            type="password"
            fullWidth
            placeholder={t('enter_password') as string}
            readOnly={isLoading}
          />

          <Input
            required
            name="reenter_password"
            control={control}
            label={t('reenter_password') as string}
            type="password"
            fullWidth
            placeholder={t('reenter_password') as string}
            readOnly={isLoading}
          />

          <Input
            required
            control={control}
            name="company_name"
            label={t('company_name') as string}
            type="text"
            fullWidth
            placeholder={t('company_name') as string}
            readOnly={isLoading}
          />

          <Input
            required
            control={control}
            name="role_in_company"
            label={t('role') as string}
            type="text"
            fullWidth
            placeholder={t('role') as string}
            readOnly={isLoading}
          />

          <DatePickerSeparator control={control} name="date_of_birth" fullWidth />

          <ReasonSection type={ReasonType.ISSUE} />

          <ReasonSection type={ReasonType.REASON_KNOW} />

          <Button fullWidth variant="contained" disabled={!isAccept && !isLoading} type="submit">
            {t('submit')}
          </Button>
          <AcceptLaw changeFeature={{ isAccept, setIsAccept: setIsAccept }} />

          <Stack py={1.5} spacing={0.5} justifyContent="center" direction="row">
            <Typography variant="body2" color="greyScale.600" fontWeight={400}>
              {t('have_account')}
            </Typography>
            <Typography
              variant="body2"
              color={(theme) => theme.palette.customPrimary[500]}
              component={Link}
              fontWeight={600}
              sx={{
                textDecoration: 'none',
              }}
              href="/sign-in"
            >
              {t('sign_in')}
            </Typography>
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
