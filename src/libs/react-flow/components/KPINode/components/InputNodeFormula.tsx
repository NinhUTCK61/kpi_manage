import { charNearCursor, convertFormula } from '@/libs/react-flow/helper/expression'
import { BaseInputProps } from '@/libs/shared/components'
import { InputBaseProps, Popper, styled } from '@mui/material'
import { useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { InputControlNode } from './InputControlNode'
import { SelectNodeSlug } from './SelectNodeSlug'

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
    field: { ref, value, onChange, ...inputProps },
  } = useController({ name, control, defaultValue })

  const [valueSelected, setValueSelected] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const [startIndex, setStartIndex] = useState<number>(0)
  const [endIndex, setEndIndex] = useState<number>(0)
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const data = charNearCursor(e)
    if (!data) return
    setAnchorEl(e.currentTarget)
    setValueSelected(data.resultString as string)
    setStartIndex(data.startIndex)
    setEndIndex(data.endIndex)
  }

  const handleSelect = (valueSelect: string) => {
    setAnchorEl(null)
    setValueSelected('')
    const newValue = convertFormula(value, valueSelect, startIndex, endIndex)
    console.log('newValue', newValue)
    onChange(newValue)
  }

  return (
    <InputControlNode
      label={label}
      required={required}
      value={value}
      sx={{ position: 'relative' }}
      {...controlProps}
    >
      <InputStyled
        inputRef={ref}
        value={value}
        mask={[
          {
            mask: Number,
            thousandsSeparator: ',',
            scale: 3,
            signed: false,
            padFractionalZeros: false,
            normalizeZeros: true,
            radix: '.',
            mapToRadix: ['.'],
          },
          {
            mask: /^=[0-9a-zA-Z+$!@#$%^&*()_+\-\[\]{};':"\\|,.<>\/?]{0,999}$/i,
          },
        ]}
        unmask
        onAccept={(value: string) => {
          onChange(value)
        }}
        onChange={() => undefined}
        style={props?.inputProps?.style || {}}
        autoComplete={'off'}
        onKeyUp={handleKeyUp}
        {...inputProps}
      />
      {valueSelected && (
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <SelectNodeSlug value={valueSelected} handleSelect={handleSelect} />
        </Popper>
      )}
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
