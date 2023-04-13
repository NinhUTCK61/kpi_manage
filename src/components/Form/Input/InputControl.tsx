import type { FormControlProps } from '@mui/material'
import { Box, FormControl } from '@mui/material'
import { memo } from 'react'
import type { FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormHelperText } from './FormHelperText'
import { FormLabel } from './FormLabel'

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
  const { t } = useTranslation('common')
  const handleError = (fieldError: FieldError) => {
    if (fieldError.message) {
      const errorField = fieldError.message
      const message = errorField.split('|')[0] as string
      const optionKey = JSON.parse(errorField.split('|')[1] || '')
      console.log(message, optionKey)

      return `${t(message, optionKey)}`
    }
    return ''
  }
  return (
    <FormControl fullWidth={fullWidth} error={!!fieldError} {...props}>
      {label && (
        <FormLabel>
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
          {typeof fieldError === 'boolean' ? helperText : handleError(fieldError)}
        </FormHelperText>
      )}
      {helperText && <FormHelperText error={false}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const InputControl = memo(RawInputControl) as typeof RawInputControl

export { InputControl }
