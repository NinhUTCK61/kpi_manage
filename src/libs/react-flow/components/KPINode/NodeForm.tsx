import { Stack } from '@mui/material'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useRFStore } from '../../hooks'
import { InputNode } from '../InputNode'

type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

type NodeFormMemoTypes = {
  input_title: string
  input_value: string | null
  unit: string | null
  nodeSlug: string
  handleFocus(): void
  handleCancelFocus(): void
}

const NodeFormMemo: React.FC<NodeFormMemoTypes> = ({
  input_title,
  input_value,
  unit,
  nodeSlug,
  handleFocus,
  handleCancelFocus,
}) => {
  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: input_title,
      unit: unit || '',
      input_value: input_value || '',
    },
  })
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const updateNode = useRFStore((state) => state.updateNode)

  const saveInput = () => {
    updateNode(nodeSlug, getValues())
    handleCancelFocus()
  }

  return (
    <Stack spacing={0.5} onClick={() => setNodeFocused(nodeSlug)}>
      <InputNode
        control={control}
        name="input_title"
        required
        label="Label"
        onBlur={saveInput}
        onFocus={() => handleFocus()}
      />
      <InputNode
        control={control}
        name="input_value"
        label="="
        onBlur={saveInput}
        onFocus={() => handleFocus()}
      />
      <InputNode
        control={control}
        name="unit"
        label="Unit"
        onBlur={saveInput}
        onFocus={() => handleFocus()}
      />
    </Stack>
  )
}

const NodeForm = memo(NodeFormMemo) as typeof NodeFormMemo

export { NodeForm }
