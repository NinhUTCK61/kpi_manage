import { useTranslateError } from '@/libs/hooks'
import { Box, BoxProps, Typography } from '@mui/material'
import type { FieldError } from 'react-hook-form'
import { FormHelperText } from './FormHelperText'
import { FormLabel } from './FormLabel'

export type AddDivControlProps = {
  helperText?: string | JSX.Element
  label?: string
  fieldError?: FieldError | boolean
  fullWidth?: boolean
  required?: boolean
}

type InputControlProps = BoxProps<'div', AddDivControlProps>

function DivFormControl({
  fieldError,
  fullWidth,
  label,
  helperText,
  children,
  required,
  ...props
}: InputControlProps) {
  const { handleError } = useTranslateError()
  return (
    <Box width={fullWidth ? '100%' : 'unset'} {...props}>
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

      {!!fieldError && (
        <FormHelperText error>
          {typeof fieldError === 'boolean'
            ? helperText
            : handleError(fieldError?.message as string)}
        </FormHelperText>
      )}
      {helperText && <FormHelperText error={false}>{helperText}</FormHelperText>}
    </Box>
  )
}

export { DivFormControl }
