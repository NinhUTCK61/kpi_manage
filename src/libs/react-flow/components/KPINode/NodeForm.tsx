import { Stack } from '@mui/material'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { InputNode } from '../InputNode'

type NodeFormProps = {
  label: string
  unit: string
  formula: string
}

const NodeFormMemo: React.FC = () => {
  const { control } = useForm<NodeFormProps>({
    defaultValues: {
      label: '11111',
      unit: '',
      formula: '',
    },
  })
  return (
    <Stack>
      <InputNode control={control} name="label" placeholder="Label" />
      <InputNode control={control} name="formula" placeholder="=" />
      <InputNode control={control} name="unit" placeholder="Unit" />
    </Stack>
  )
}

const NodeForm = memo(NodeFormMemo) as typeof NodeFormMemo

export { NodeForm }
