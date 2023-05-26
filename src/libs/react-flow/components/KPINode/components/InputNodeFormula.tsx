import { BaseInputProps } from '@/libs/shared/components'
import { InputBaseProps, styled } from '@mui/material'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { InputControlNode } from './InputControlNode'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

function InputNodeFormula<T extends FieldValues>({
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
      <InputStyled
        mask={[
          {
            mask: /^\d+$/,
            thousandsSeparator: ',',
          },
          {
            mask: /^=[0-9a-z]{0,1000}$/i,
          },
        ]}
        inputRef={ref}
        overwrite
        {...inputProps}
        value={value}
      />
    </InputControlNode>
  )
}

const InputStyled = styled(IMaskInput)(({ theme }) => ({
  width: 140,
  fontSize: 15,
  lineHeight: '22px',
  padding: 0,
  color: theme.palette.base.black,
  marginBottom: 4,
  border: 0,
  boxSizing: 'border-box',
  background: 'none',
  WebkitTapHighlightColor: 'transparent',
  '&:focus': {
    outline: 'none',
  },
}))

export { InputNodeFormula }
