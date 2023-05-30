import { api } from '@/libs/api'
import { charFullNearCursor, convertFormula } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { BaseInputProps } from '@/libs/shared/components'
import { InputBaseProps, Popper, styled } from '@mui/material'
import { useRef, useState } from 'react'
import { FieldValues, useController, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { NodeFormProps } from '../hooks'
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
  const { setError } = useFormContext<NodeFormProps>()
  const findNodeBySlug = useRFStore((state) => state.findNodeBySlug)
  const templateId = useRFStore((state) => state.templateId)
  const [valueSelected, setValueSelected] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)
  const [currentState, setCurrentState] = useState(0)
  const elementRef = useRef<HTMLUListElement>(null)

  const { data } = api.node.searchSlug.useQuery(
    {
      template_id: templateId,
      slug: valueSelected.replaceAll(' ', '').toUpperCase(),
    },
    {
      initialData: [],
    },
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const isDown = e.key === 'ArrowDown'
      const stateDown = currentState === data.length - 1 ? 0 : currentState + 1
      const stateUp = currentState === 0 ? data.length - 1 : currentState - 1
      const _currentState = isDown ? stateDown : stateUp

      setCurrentState(_currentState)
      if (elementRef.current) {
        let top = 0
        if (isDown && _currentState >= 4) {
          top = _currentState * 54
        }
        if (!isDown) {
          top = _currentState * 54
        }
        elementRef.current.scrollTop = top
      }
      e.preventDefault()
      return
    }

    if (e.key === 'Enter') {
      const newValue = convertFormula(
        value,
        data[currentState]?.slug as string,
        startIndex,
        endIndex,
      )
      onChange(newValue)
      setCurrentState(0)
      setValueSelected('')
      setAnchorEl(null)
      e.preventDefault()
      return
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const data = charFullNearCursor(e)

    if (!data?.resultString.replaceAll(' ', '')) {
      setAnchorEl(null)
      setValueSelected('')
      return
    }

    const check = findNodeBySlug(data.resultString.replaceAll(' ', '').toUpperCase())
    if (check) {
      setAnchorEl(e.currentTarget)
      setValueSelected(data.resultString as string)
      setStartIndex(data.startIndex)
      setEndIndex(data.endIndex)
      return
    }

    setError('input_value', {
      message: 'not found node',
    })
  }

  const handleSelect = (valueSelect: string) => {
    setAnchorEl(null)
    setValueSelected('')
    const newValue = convertFormula(value, valueSelect, startIndex, endIndex)
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
            mask: /^=[0-9a-zA-Z+$!@#$%^&*()_+\-\[\]{};':"\\|,.<>\/? ]{0,999}$/i,
          },
        ]}
        unmask
        onAccept={(value: string) => {
          onChange(value)
        }}
        onChange={() => undefined}
        style={props?.inputProps?.style || {}}
        autoComplete={'off'}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        {...inputProps}
      />
      {valueSelected && (
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <SelectNodeSlug
            value={valueSelected}
            handleSelect={handleSelect}
            currentState={currentState}
            elementRef={elementRef}
          />
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
