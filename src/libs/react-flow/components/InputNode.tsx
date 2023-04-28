import { InputBase, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputProps } from '../../shared/components/Form/Input/Input'
import { InputControlNode } from './KPINode/InputControlNode'

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
    fieldState: { error },
  } = useController({ name, control, defaultValue })
  return (
    <InputControlNode
      fieldError={error}
      label={label}
      required={required}
      value={value}
      {...controlProps}
    >
      <InputStyled {...inputProps} {...props} inputRef={ref} value={value} />
    </InputControlNode>
  )
}

const InputStyled = styled(InputBase)({
  '& .MuiInputBase-input': {
    width: 140,
    fontSize: 15,
    lineHeight: '22px',
    padding: 0,
  },
})

export { InputNode }
