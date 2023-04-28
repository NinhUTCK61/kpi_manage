import { Stack } from '@mui/material'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { InputNode } from '../InputNode'

type NodeFormProps = {
  label: string
  unit: string
  formula: string
}

type NodeFormMemoTypes = {
  input_title: string
  input_value: string | null
  unit: string | null
}

const NodeFormMemo: React.FC<NodeFormMemoTypes> = ({ input_title, input_value, unit }) => {
  const { control } = useForm<NodeFormProps>({
    defaultValues: {
      label: input_title,
      unit: unit || '',
      formula: input_value || '',
    },
  })
  return (
    <Stack spacing={0.5}>
      <InputNode control={control} name="label" required label="Label" />
      <InputNode control={control} name="formula" label="=" />
      <InputNode control={control} name="unit" label="Unit" />
    </Stack>
  )
}

const NodeForm = memo(NodeFormMemo) as typeof NodeFormMemo

export { NodeForm }
