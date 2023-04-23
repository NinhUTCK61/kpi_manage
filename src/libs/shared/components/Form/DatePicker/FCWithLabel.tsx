import { FormControl, FormControlProps, Typography } from '@mui/material'
import type { FieldError } from 'react-hook-form'
import { FormLabel } from '../Input/FormLabel'

type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
}

type InputControlProps = FormControlProps<'div', AddControlProps>

function FCWithLabel({
  fieldError,
  fullWidth,
  label,
  children,
  required,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label && (
        <FormLabel>
          {required ? (
            <>
              {label}
              <Typography
                ml={0.5}
                variant="body2"
                component="span"
                sx={{ color: 'red !important' }}
              >
                *
              </Typography>
            </>
          ) : (
            label
          )}
        </FormLabel>
      )}

      {children}
    </FormControl>
  )
}

export { FCWithLabel }
