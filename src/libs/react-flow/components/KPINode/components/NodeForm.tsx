import { Stack } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useForm } from 'react-hook-form'
import { useKPINodeContext } from '../context'
import { useNodeHandler } from '../hooks'
import { InputNode } from './InputNode'

type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

type NodeFormMemoTypes = {
  changeFocusState(state: boolean): void
}

const NodeFormInner: React.FC<NodeFormMemoTypes> = ({ changeFocusState }) => {
  const { data } = useKPINodeContext()
  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      unit: data.unit || '',
      input_value: data.input_value || '',
    },
  })

  const { saveHandler } = useNodeHandler()

  const saveValue = () => {
    // TODO: write function handle node data
    const nodeData = { ...data, ...getValues() }
    const input_value = nodeData.input_value || ''
    const is_formula = input_value.includes('=')

    if (!is_formula) {
      nodeData.value2number = Number(input_value)
    } else {
      // TODO: handler calculate formula here
      nodeData.value2number = null
    }

    nodeData.is_formula = is_formula
    saveHandler(nodeData)
    changeFocusState(false)
  }

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveValue()
  }

  const handleFocus = () => {
    changeFocusState(true)
  }

  const style = JSON.parse(data.node_style || '{}')

  return (
    <Stack component="form" onSubmit={saveForm} spacing={0.5}>
      <InputNode
        control={control}
        name="input_title"
        required
        label="Label"
        onBlur={saveValue}
        onFocus={handleFocus}
        inputProps={{ style }}
      />

      <InputNode
        control={control}
        name="input_value"
        label="="
        onBlur={saveValue}
        onFocus={handleFocus}
        inputProps={{ style }}
      />

      <InputNode
        control={control}
        name="unit"
        label="Unit"
        onBlur={saveValue}
        onFocus={handleFocus}
        inputProps={{ style }}
      />

      <input type="submit" hidden />
    </Stack>
  )
}

const NodeForm = memo(NodeFormInner) as typeof NodeFormInner

export { NodeForm }
