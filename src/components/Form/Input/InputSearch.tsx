import { OutlinedInput, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import type { InputProps } from './Input'
import { InputControl } from './InputControl'

function InputSearch<T extends FieldValues>({
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
  backgroundColor: theme.palette.greyScale[100],
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.5),
  },
}))

export { InputSearch }
