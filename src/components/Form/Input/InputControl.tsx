import type { FormControlProps } from '@mui/material'
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material'
import { memo } from 'react'
import type { FieldError } from 'react-hook-form'

export type AddControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function RawInputControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  required,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label && (
        <FormLabel sx={{ marginBottom: '6px', fontWeight: 400, fontSize: 15, lineHeight: '22px' }}>
          {required ? (
            <>
              {label}
              <Box sx={{ marginLeft: '3px' }} component="span" color="red">
                *
              </Box>
            </>
          ) : (
            `${label}`
          )}
        </FormLabel>
      )}

      {children}

      {!!fieldError && (
        <FormHelperText error>
          {typeof fieldError === 'boolean' ? helperText : fieldError?.message}
        </FormHelperText>
      )}
      {helperText && <FormHelperText error={false}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
