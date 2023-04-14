import { passwordPolicySchema } from '@/libs/schema'
import { Stack, StackProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import AlertIcon from 'public/assets/svgs/alert.svg'
import AlertCheckedIcon from 'public/assets/svgs/success.svg'
import ErrorIcon from '/public/assets/svgs/info.svg'

type PasswordStateValidationProps = StackProps<
  'div',
  {
    password: string
  }
>

enum PasswordState {
  Valid,
  Invalid,
  Idle,
}

const PasswordValidStateIconMap = {
  [PasswordState.Valid]: AlertCheckedIcon,
  [PasswordState.Invalid]: ErrorIcon,
  [PasswordState.Idle]: AlertIcon,
}

const listPasswordValidate = [
  { id: 'password_err_min', status: PasswordState.Idle, text_key: 'password_err_min' },
  { id: 'password_err_special', status: PasswordState.Idle, text_key: 'password_err_special' },
  { id: 'password_err_upper', status: PasswordState.Idle, text_key: 'password_err_upper' },
  { id: 'password_err_lower', status: PasswordState.Idle, text_key: 'password_err_lower' },
  { id: 'password_err_number', status: PasswordState.Idle, text_key: 'password_err_number' },
]

const PasswordStateValidation: React.FC<PasswordStateValidationProps> = ({
  password,
  ...stackProps
}) => {
  const { t } = useTranslation(['common'])

  const parsePassword = passwordPolicySchema.safeParse(password)
  const passwordState = parsePassword.success ? [] : parsePassword.error.flatten().formErrors

  const passwordStateList = password
    ? listPasswordValidate.map((e) => ({
        ...e,
        status: passwordState.includes(e.text_key) ? PasswordState.Invalid : PasswordState.Valid,
      }))
    : listPasswordValidate

  return (
    <Stack spacing={1.5} {...stackProps}>
      {passwordStateList.map((e) => (
        <Stack key={e.id} direction="row" spacing={7 / 9} alignItems="center">
          <Image src={PasswordValidStateIconMap[e.status]} alt="alert" />
          <Typography color="greyScale.700" variant="body2">
            {t(e.text_key)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export { PasswordStateValidation }
