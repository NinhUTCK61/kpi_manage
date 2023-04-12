import {
  FormControlProps,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  styled,
} from '@mui/material'
import Image from 'next/image'
import HiddenIcon from 'public/assets/svgs/hidden.svg'
import ShowIcon from 'public/assets/svgs/show.svg'
import { useState } from 'react'
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
  type,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true)

  return (
    <InputControl
      fieldError={error}
      fullWidth={fullWidth}
      label={label}
      required={required}
      helperText={helperText}
      {...controlProps}
    >
      <InputStyled
        type={!hiddenPassword ? 'text' : type}
        {...(type === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setHiddenPassword((pre) => !pre)}>
                <Image src={hiddenPassword ? HiddenIcon : ShowIcon} alt="icon-password" />
              </IconButton>
            </InputAdornment>
          ),
        })}
        {...inputProps}
        {...props}
        inputRef={ref}
      />
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
  '&::placeholder': {
    color: theme.palette.greyScale[500],
    fontSize: 15,
    lineHeight: '22px',
  },
}))

export { Input, InputStyled }
