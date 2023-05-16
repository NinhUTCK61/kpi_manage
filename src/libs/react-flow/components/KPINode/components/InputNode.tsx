import { InputBase, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from '../../../../shared/components/Form/Input/Input'
import { InputControlNode } from './InputControlNode'

function InputNode<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  controlProps,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name, control, defaultValue })
  return (
    <InputControlNode label={label} required={required} value={value} {...controlProps}>
      <InputStyled {...inputProps} {...props} inputRef={ref} value={value} />
    </InputControlNode>
  )
}

const InputStyled = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    width: 140,
    fontSize: 15,
    lineHeight: '22px',
    padding: 0,
    color: theme.palette.base.black,
  },
  marginBottom: 4,
}))

export { InputNode }
