import { OutlinedInput, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from './Input'
import { InputControl } from './InputControl'

function InputNode<T extends FieldValues>({
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
      border: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '&:focus-visible ': {
    border: 'none',
  },
  borderRadius: theme.spacing(0.5),
  color: theme.palette.common.black,
  fontWeight: 400,
  gap: 8,
  border: 'none',
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(0),
  },
  '&::placeholder': {
    color: theme.palette.greyScale[500],
    fontSize: 15,
    lineHeight: '22px',
  },
  '&::fieldset': {
    border: 'none',
  },
  width: 140,
}))

export { InputNode }
