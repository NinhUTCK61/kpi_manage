import { FormControl, InputBase, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from '../../../../shared/components/Form/Input/Input'

function InputSpeechBalloon<T extends FieldValues>({
  name,
  control,
  defaultValue,
  controlProps,
  required,
  fullWidth,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name, control, defaultValue })
  return (
    <FormControl fullWidth={fullWidth} required={required} {...controlProps}>
      <InputStyled {...inputProps} {...props} inputRef={ref} value={value} />
    </FormControl>
  )
}

const InputStyled = styled(InputBase)(({ theme }) => ({
  color: theme.palette.customPrimary[0o0],
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 22,
  minWidth: 210,
  minHeight: 36,
}))

export { InputSpeechBalloon }
