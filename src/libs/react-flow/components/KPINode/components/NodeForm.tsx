import { blue, red } from '@/libs/config/theme'
import { PANE_CLASS_NAME } from '@/libs/react-flow/constant'
import { ClickAwayListener, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import AlertIcon from 'public/assets/svgs/alert_error.svg'
import { FormEvent, KeyboardEvent, memo } from 'react'
import { useKPINodeContext } from '../context'
import { NodeFormProps, useNodeForm, useNodeHandler } from '../hooks'
import { InputNode } from './InputNode'
import { StackError } from './styled'

type NodeFormMemoTypes = {
  changeFormFocusState(state: boolean): void
}

const NodeFormInner: React.FC<NodeFormMemoTypes> = ({ changeFormFocusState }) => {
  const { data } = useKPINodeContext()
  const { control, getValues, setFocus, error } = useNodeForm(data)
  const { saveHandler } = useNodeHandler()

  const saveValue = () => {
    if (error) return
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

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const targetClass = (event.target as HTMLDivElement).className
    if (targetClass === PANE_CLASS_NAME) {
      saveValue()
    }
  }

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
      <Stack
        component="form"
        onSubmit={saveForm}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        sx={{
          padding: (theme) => theme.spacing(2, 2.25),
          border: `2px solid`,
          borderColor: !!error ? red[400] : blue[500],
          position: 'relative',
          borderRadius: 2,
        }}
      >
        {!!error && (
          <StackError spacing={0.5} direction="row">
            <Image src={AlertIcon} alt="alert" />
            <Typography color="red.400" whiteSpace="nowrap">
              {error}
            </Typography>
          </StackError>
        )}

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
