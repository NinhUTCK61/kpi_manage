import { InputControl, InputProps } from '@/libs/shared/components'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { InputStyled } from './styled'

function InputComment<T extends FieldValues>({
  name,
  control,
  defaultValue,
  controlProps,
  required,
  ...props
}: InputProps<T>) {
  const {
    field: { ref, value, ...inputProps },
  } = useController({ name, control, defaultValue })

  return (
    <InputControl required={required} {...controlProps}>
      <InputStyled {...inputProps} {...props} inputRef={ref} value={value} />
    </InputControl>
  )
}

export { InputComment }
