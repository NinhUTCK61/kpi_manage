import { BaseInputProps } from '@/libs/shared/components'
import { InputBase, InputBaseProps, styled } from '@mui/material'
import { forwardRef } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { InputControlNode } from './InputControlNode'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const InputMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      mask={[
        {
          mask: Number,
          thousandsSeparator: ',',
          scale: 3, // digits after point, 0 for integers
          signed: false, // disallow negative
          padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
          normalizeZeros: true, // appends or removes zeros at ends
          radix: '.', // fractional delimiter
          mapToRadix: ['.'], // symbols to process as radix
        },
        {
          mask: /^=[0-9a-zA-Z+$!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,999}$/i,
        },
      ]}
      unmask={true}
      inputRef={ref}
      onAccept={(value: string) => {
        onChange({ target: { name: props.name, value } })
      }}
      overwrite
      onChange={(e) => {
        console.log((e.target as HTMLInputElement).value)
      }}
      {...other}
    />
  )
})

function InputNodeFormula<T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  controlProps,
  required,
}: InputNodeProps<T>) {
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({ name, control, defaultValue })

  return (
    <InputControlNode label={label} required={required} value={value} {...controlProps}>
      <InputStyled
        inputRef={ref}
        inputComponent={InputMaskCustom as any}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </InputControlNode>
  )
}

// const InputStyled = styled()(({ theme }) => ({
//   width: 140,
//   fontSize: 15,
//   lineHeight: '22px',
//   padding: 0,
//   color: theme.palette.base.black,
//   marginBottom: 4,
//   border: 0,
//   boxSizing: 'border-box',
//   background: 'none',
//   WebkitTapHighlightColor: 'transparent',
//   '&:focus': {
//     outline: 'none',
//   },
// }))

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

export { InputNodeFormula }
