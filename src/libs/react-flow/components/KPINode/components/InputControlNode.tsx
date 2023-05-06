import { FormControl, FormControlProps, Typography } from '@mui/material'

export type AddControlProps = {
  label?: string
  value?: string
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function InputControlNode({
  fullWidth,
  label,
  children,
  required,
  value,
  ...props
}: InputControlProps) {
  return (
    <FormControl fullWidth={fullWidth} {...props}>
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

export { InputControlNode }
