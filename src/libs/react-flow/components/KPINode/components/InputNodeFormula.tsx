import { BaseInputProps } from '@/libs/shared/components'
import { InputBaseProps, Popper, styled } from '@mui/material'
import { FieldValues, useController } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { useNodeFormulaContext } from '../context'
import { NodeFormProps } from '../hooks'
import { InputControlNode } from './InputControlNode'
import { NodeFormulaProvider } from './NodeFormulaProvider'
import { SelectNodeSlug } from './SelectNodeSlug'

type InputNodeProps<T extends FieldValues> = BaseInputProps<T> & InputBaseProps

function InputNodeFormulaControl<T extends FieldValues>({
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

  const { state, handleClick, handleKeyDown, handleKeyUp } = useNodeFormulaContext()

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
        onClick={handleClick}
        {...inputProps}
      />
      {state.valueSelected && (
        <Popper open={!!state.anchorEl} anchorEl={state.anchorEl}>
          <SelectNodeSlug />
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

const InputNodeFormula = (props: InputNodeProps<NodeFormProps>) => {
  return (
    <NodeFormulaProvider>
      <InputNodeFormulaControl {...props} />
    </NodeFormulaProvider>
  )
}

export { InputNodeFormula }
