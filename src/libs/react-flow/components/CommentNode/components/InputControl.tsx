import { FormControl, FormControlProps } from '@mui/material'

const InputControlComment: React.FC<FormControlProps> = ({ fullWidth, children, ...props }) => {
  return (
    <FormControl fullWidth={fullWidth} {...props}>
      {children}
    </FormControl>
  )
}

export { InputControlComment }
