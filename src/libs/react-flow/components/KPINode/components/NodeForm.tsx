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
  handleFocus(): void
  handleCancelFocus(): void
}

const NodeFormMemo: React.FC<NodeFormMemoTypes> = ({ handleFocus, handleCancelFocus }) => {
  const { data } = useKPINodeContext()

  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      unit: data.unit || '',
      input_value: data.input_value || '',
    },
  })

  const updateNode = useRFStore((state) => state.updateKPINode)

  const saveInput = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    updateNode({ ...data, ...getValues() })
    handleCancelFocus()
  }

  return (
    <Stack component="form" onSubmit={saveInput} spacing={0.5}>
      <InputNode
        control={control}
        name="input_title"
        required
        label="Label"
        onBlur={() => saveInput()}
        onFocus={handleFocus}
      />

      <InputNode
        control={control}
        name="input_value"
        label="="
        onBlur={() => saveInput()}
        onFocus={handleFocus}
      />

      <InputNode
        control={control}
        name="unit"
        label="Unit"
        onBlur={() => saveInput()}
        onFocus={handleFocus}
      />

      <input type="submit" hidden />
    </Stack>
  )
}

const NodeForm = memo(NodeFormMemo) as typeof NodeFormMemo

export { NodeForm }
