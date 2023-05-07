import { Stack } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useForm } from 'react-hook-form'
import { useRFStore } from '../../../hooks'
import { useKPINodeContext } from '../context'
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
  const updateNode = useRFStore((state) => state.updateKPINode)
  const { data } = useKPINodeContext()
  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      unit: data.unit || '',
      input_value: data.input_value || '',
    },
  })

  const saveValue = () => {
    updateNode({ ...data, ...getValues() })
    changeFocusState(false)
  }

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault
    saveValue()
  }

  const handleFocus = () => {
    changeFocusState(true)
  }

  return (
    <Stack component="form" onSubmit={saveForm} spacing={0.5}>
      <InputNode
        control={control}
        name="input_title"
        required
        label="Label"
        onBlur={saveValue}
        onFocus={handleFocus}
      />

      <InputNode
        control={control}
        name="input_value"
        label="="
        onBlur={saveValue}
        onFocus={handleFocus}
      />

      <InputNode
        control={control}
        name="unit"
        label="Unit"
        onBlur={saveValue}
        onFocus={handleFocus}
      />

      <input type="submit" hidden />
    </Stack>
  )
}

const NodeForm = memo(NodeFormInner) as typeof NodeFormInner

export { NodeForm }
