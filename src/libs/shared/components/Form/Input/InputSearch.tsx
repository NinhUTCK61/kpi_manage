import { InputBase, styled } from '@mui/material'
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
      sx={{ width: '100%' }}
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

const InputStyled = styled(InputBase)(({ theme }) => ({
  marginRight: theme.spacing(1.75),
  borderRadius: theme.spacing(1),
  color: theme.palette.common.black,
  backgroundColor: theme.palette.greyScale[100],
  gap: 8,
  height: 38,
  width: 465,
  fontSize: 15,
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1, 1.75, 1, 0),
  },
  '& .MuiInputAdornment-positionStart': {
    marginRight: 0,
  },
  [theme.breakpoints.down('lg')]: {
    width: 350,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

export { InputSearch }
