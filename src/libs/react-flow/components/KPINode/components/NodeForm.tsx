import { ClickAwayListener, Stack } from '@mui/material'
import { FormEvent, KeyboardEvent, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useKPINodeContext } from '../context'
import { useNodeHandler } from '../hooks'
import { InputNode } from './InputNode'

export type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

type NodeFormMemoTypes = {
  changeFormFocusState(state: boolean): void
}

const NodeFormInner: React.FC<NodeFormMemoTypes> = ({ changeFormFocusState }) => {
  const { data } = useKPINodeContext()
  const { control, getValues, setFocus } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
    },
  })

  useEffect(() => {
    setTimeout(() => {
      if (!data.input_title) {
        setFocus('input_title')
      }
    }, 0)
  }, [data.input_title, setFocus])

  const { saveHandler } = useNodeHandler()
  const saveValue = () => {
    const nodeData = { ...data, ...getValues() }
    saveHandler(nodeData)
    changeFormFocusState(false)
  }

  const saveForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveValue()
  }

  const handleFocus = () => {
    changeFormFocusState(true)
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
      <Stack
        component="form"
        onSubmit={saveForm}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        spacing={0.5}
      >
        <InputNode
          control={control}
          name="input_title"
          required
          label="Label"
          inputProps={{ style }}
        />

        <InputNode control={control} name="input_value" label="=" inputProps={{ style }} />

        <InputNode control={control} name="unit" label="Unit" inputProps={{ style }} />

        <input type="submit" hidden />
      </Stack>
    </ClickAwayListener>
  )
}

const NodeForm = memo(NodeFormInner) as typeof NodeFormInner

export { NodeForm }
