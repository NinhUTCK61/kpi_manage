import { FormControl, FormControlProps, Typography } from '@mui/material'
import { memo } from 'react'
import type { FieldError } from 'react-hook-form'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
  value?: string
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  children,
  required,
  value,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {!value && (
        <Typography
          variant="body2"
          color="greyScale.500"
          sx={{
            position: 'absolute',
          }}
        >
          {label}

          {required && (
            <Typography ml={0.5} variant="body2" component="span" sx={{ color: 'red !important' }}>
              *
            </Typography>
          )}
        </Typography>
      )}

      {children}
    </FormControl>
  )
}

const InputControlNode = memo(RawInputControl) as typeof RawInputControl

export { InputControlNode }
