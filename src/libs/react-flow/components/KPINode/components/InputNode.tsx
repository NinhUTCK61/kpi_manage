import { BaseInputProps } from '@/libs/shared/components'
import { InputBase, InputBaseProps, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputControlNode } from './InputControlNode'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

function InputNode<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  controlProps,
  required,
  ...props
}: InputNodeProps<T>) {
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
