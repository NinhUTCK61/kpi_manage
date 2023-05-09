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
    const nodeData = { ...data, ...getValues() }
    const input_value = Number(nodeData.input_value?.replace('=', ''))
    if (!!input_value) {
      nodeData.value2number = input_value
    } else {
      nodeData.value2number = 0
    }
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

  const style = JSON.parse(data.node_style as string) || {}

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
