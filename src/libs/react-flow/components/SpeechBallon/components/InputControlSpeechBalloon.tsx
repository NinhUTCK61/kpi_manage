import { FormControl, FormControlProps, Typography } from '@mui/material'

export type AddControlProps = {
  value?: string
  label?: string
}

export type InputControlProps = FormControlProps<'div', AddControlProps>

function InputControlSpeechBalloon({ fullWidth, children, value, ...props }: InputControlProps) {
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
          {value}
        </Typography>
      )}

      {children}
    </FormControl>
  )
}

export { InputControlSpeechBalloon }
