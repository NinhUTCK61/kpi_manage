import { InputBase, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from '../../../../shared/components/Form/Input/Input'
import { InputControlSpeechBalloon } from './InputControlSpeechBalloon'

function InputSpeechBalloon<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  controlProps,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name, control, defaultValue })
  return (
    <InputControlSpeechBalloon label={label} required={required} value={value} {...controlProps}>
      <InputStyle {...inputProps} {...props} inputRef={ref} value={value} />
    </InputControlSpeechBalloon>
  )
}

const InputStyle = styled(InputBase)(({ theme }) => ({
  color: theme.palette.customPrimary[0o0],
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '22px',
  minWidth: '210px',
  minHeight: '36px',
}))

export { InputSpeechBalloon }
