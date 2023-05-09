import { ClickAwayListener, Stack } from '@mui/material'
import { FormEvent, KeyboardEvent, memo } from 'react'
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
  const { control, getValues, setFocus } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
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

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      const name = (e.target as HTMLInputElement).name
      const inputArr = Object.keys(getValues())
      const currentIndex = inputArr.indexOf(name)
      const nextIndex = currentIndex === inputArr.length - 1 ? 0 : currentIndex + 1
      setFocus(inputArr[nextIndex] as keyof NodeFormProps)
    }
  }

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={saveValue}>
      <Stack component="form" onSubmit={saveForm} onKeyDown={handleKeyDown} spacing={0.5}>
        <InputNode
          control={control}
          name="input_title"
          required
          label="Label"
          onFocus={handleFocus}
          inputProps={{ style }}
        />

        <InputNode
          control={control}
          name="input_value"
          label="="
          onFocus={handleFocus}
          inputProps={{ style }}
        />

        <InputNode
          control={control}
          name="unit"
          label="Unit"
          onFocus={handleFocus}
          inputProps={{ style }}
        />

        <input type="submit" hidden />
      </Stack>
    </ClickAwayListener>
  )
}

const NodeForm = memo(NodeFormInner) as typeof NodeFormInner

export { NodeForm }
