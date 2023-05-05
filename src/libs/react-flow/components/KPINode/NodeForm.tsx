import { Stack } from '@mui/material'
import { CSSProperties, FormEvent, memo } from 'react'
import { useForm } from 'react-hook-form'
import { useRFStore } from '../../hooks'
import { InputNode } from '../InputNode'

type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

type NodeFormMemoTypes = {
  inputTitle: string
  inputValue: string | null
  unit: string | null
  nodeSlug: string
  handleFocus(): void
  handleCancelFocus(): void
  style?: CSSProperties
}

const NodeFormMemo: React.FC<NodeFormMemoTypes> = ({
  inputTitle,
  inputValue,
  unit,
  nodeSlug,
  handleFocus,
  handleCancelFocus,
  style,
}) => {
  const { control, getValues } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: inputTitle,
      unit: unit || '',
      input_value: inputValue || '',
    },
  })

  const updateNode = useRFStore((state) => state.updateNode)

  const saveInput = (event?: FormEvent<HTMLFormElement>) => {
    event && event.preventDefault()
    updateNode(nodeSlug, getValues())
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
        inputProps={{
          style,
        }}
      />

      <InputNode
        control={control}
        name="input_value"
        label="="
        onBlur={() => saveInput()}
        onFocus={handleFocus}
        inputProps={{
          style,
        }}
      />

      <InputNode
        control={control}
        name="unit"
        label="Unit"
        onBlur={() => saveInput()}
        onFocus={handleFocus}
        inputProps={{
          style,
        }}
      />

      <input type="submit" hidden />
    </Stack>
  )
}

const NodeForm = memo(NodeFormMemo) as typeof NodeFormMemo

export { NodeForm }
