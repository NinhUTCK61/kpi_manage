import { charFullNearCursor, convertFormula } from '@/libs/react-flow/helper/expression'
import { useRFStore } from '@/libs/react-flow/hooks'
import { BaseInputProps } from '@/libs/shared/components'
import { InputBaseProps, Popper, styled } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { FieldValues, useController, useFormContext } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { NodeFormProps } from '../hooks'
import { InputControlNode } from './InputControlNode'
import { SelectNodeSlug } from './SelectNodeSlug'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

type StateProps = {
  anchorEl: null | HTMLElement
  valueSelected: string
  startIndex: number
  endIndex: number
  currentState: number
}

const defaultValueState = {
  anchorEl: null,
  valueSelected: '',
  startIndex: 0,
  endIndex: 0,
  currentState: 0,
}

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
  const { t } = useTranslation()
  const { setError } = useFormContext<NodeFormProps>()
  const elementRef = useRef<HTMLUListElement>(null)
  const [state, setState] = useState<StateProps>(defaultValueState)
  const nodeSearch = useRFStore((state) => state.nodeSearch)
  const filterNodeSearch = useRFStore((state) => state.filterNodeSearch)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!state.valueSelected) return
    if (nodeSearch.length === 0) return
    const _state = state
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const isDown = e.key === 'ArrowDown'
      const _currentState = _state.currentState
      const stateDown = _currentState === nodeSearch.length - 1 ? 0 : _currentState + 1
      const stateUp = _currentState === 0 ? nodeSearch.length - 1 : _currentState - 1
      const currentState = isDown ? stateDown : stateUp

      _state.currentState = currentState
      setState({ ..._state })

      if (elementRef.current) {
        let top = 0
        if (isDown && currentState >= 4) {
          top = currentState * 54
        }
        if (!isDown) {
          top = currentState * 54
        }
        elementRef.current.scrollTop = top
      }
      e.preventDefault()
    }

    if (e.key === 'Enter') {
      const newValue = convertFormula(
        value,
        nodeSearch[state.currentState]?.data?.slug as string,
        state.startIndex,
        state.endIndex,
      )
      onChange(newValue)
      setState(defaultValueState)
      e.preventDefault()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') return
    const data = charFullNearCursor(e)
    const _state = state
    if (!data?.resultString.replaceAll(' ', '')) {
      setState(defaultValueState)
      return
    }

    const check = filterNodeSearch(data.resultStringFull.replaceAll(' ', '').toUpperCase())

    if (check.length !== 0) {
      setState({
        ..._state,
        anchorEl: e.currentTarget,
        valueSelected: data.resultStringFull as string,
        startIndex: data.startIndex,
        endIndex: data.endIndex,
      })
      return
    }

    setError('input_value', {
      message: t('error.node_not_found_1') + data.resultStringFull + t('error.node_not_found_2'),
    })
  }

  const handleSelect = (valueSelect: string) => {
    const newValue = convertFormula(value, valueSelect, state.startIndex, state.endIndex)
    onChange(newValue)
    setState(defaultValueState)
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
      {state.valueSelected && (
        <Popper open={!!state.anchorEl} anchorEl={state.anchorEl}>
          <SelectNodeSlug
            value={state.valueSelected}
            handleSelect={handleSelect}
            currentState={state.currentState}
            elementRef={elementRef}
            nodeSearch={nodeSearch}
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
