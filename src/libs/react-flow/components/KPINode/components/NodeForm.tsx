import { blue, red } from '@/libs/config/theme'
import { useTranslateError } from '@/libs/hooks'
import { NodeFormSchema } from '@/libs/schema/node'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClickAwayListener, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import AlertIcon from 'public/assets/svgs/alert_error.svg'
import { FormEvent, KeyboardEvent, memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useKPINodeContext } from '../context'
import { useNodeHandler } from '../hooks'
import { InputNode } from './InputNode'
import { StackError } from './styled'

type NodeFormProps = {
  input_title: string
  input_value: string | null
  unit: string | null
}

type NodeFormMemoTypes = {
  changeFormFocusState(state: boolean): void
}

const INDEX_ERRORS = ['empty_node_form', 'input_title']

const NodeFormInner: React.FC<NodeFormMemoTypes> = ({ changeFormFocusState }) => {
  const { data } = useKPINodeContext()
  const {
    control,
    getValues,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<NodeFormProps>({
    defaultValues: {
      input_title: data.input_title || '',
      input_value: data.input_value || '',
      unit: data.unit || '',
    },
    resolver: zodResolver(NodeFormSchema),
  })
  const { handleError } = useTranslateError()

  const [error, setError] = useState<string>('')
  useEffect(() => {
    if (!errors) {
      setError('')
      return
    }

    for (let i = 0; i <= INDEX_ERRORS.length; i++) {
      const key = INDEX_ERRORS[i] as keyof NodeFormProps
      if (errors[key]) {
        setError(handleError(errors[key]?.message as string))
        break
      }
    }
  }, [errors, getValues, handleError])

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
    handleSubmit(() => {
      saveHandler(nodeData)
    })()
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
        sx={{
          padding: (theme) => theme.spacing(2, 2.25),
          border: `2px solid`,
          borderColor: !!error ? red[400] : blue[500],
          position: 'relative',
          borderRadius: 2,
        }}
      >
        {error && (
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
