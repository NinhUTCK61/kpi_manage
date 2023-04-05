import type { FormControlProps, OutlinedInputProps } from '@mui/material'
import { OutlinedInput } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { AddControlProps } from './InputControl'
import { InputControl } from './InputControl'

export type InputProps<T extends FieldValues> = UseControllerProps<T> &
  OutlinedInputProps &
  AddControlProps & {
    controlProps?: FormControlProps
  }

function Input<T extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth,
  label,
  helperText,
  controlProps,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
      {...controlProps}
    >
      <InputStyled {...inputProps} {...props} inputRef={ref} />
    </InputControl>
  )
}

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.blue[300],
    },
  },
  '&:hover fieldset': {
    borderColor: `${theme.palette.blue[400]} !important`,
  },
  borderRadius: theme.spacing(0.5),
  color: theme.palette.common.black,
  fontWeight: 400,
  gap: 8,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.5),
  },
}))

export { Input, InputStyled }
