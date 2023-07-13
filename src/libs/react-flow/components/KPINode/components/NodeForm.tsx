import { blue, red } from '@/libs/config/theme'
import { isPaneClick } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { ClickAwayListener, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import AlertIcon from 'public/assets/svgs/alert_error.svg'
import React, { KeyboardEvent as KeyboardEventReact, memo } from 'react'
import { FormProvider } from 'react-hook-form'
import { useEventListener } from 'usehooks-ts'
import { useKPINodeContext } from '../context'
import { NodeFormProps, useFormularHanlder, useNodeForm, useNodeHandler } from '../hooks'
import { InputNodeFormula } from './InputFomula'
import { InputNode } from './InputNode'
import { StackError } from './styled'

type NodeFormMemoTypes = {
  changeFormFocusState(state: boolean): void
  formFocus: boolean
}

const NodeFormInner: React.FC<NodeFormMemoTypes> = ({ changeFormFocusState, formFocus }) => {
  const { data } = useKPINodeContext()
  const method = useNodeForm(data)
  const { control, getValues, error, setFocus, setError } = method
  const { saveHandler } = useNodeHandler()
  const getKpiNodes = useRFStore((state) => state.getKpiNodes)
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const setNodeFocused = useRFStore((state) => state.setNodeFocused)
  const { nodeInputValidate } = useFormularHanlder()
  const { t } = useTranslation('file')

  const saveValue = () => {
    if (error) {
      method.reset()
      return
    }
    const nodes = getKpiNodes()
    if (!nodeFocused || (nodeFocused && nodeFocused.type !== 'kpi')) return
    const nodeData = { ...data, ...getValues() }
    const inputValue = nodeData.input_value
    if (inputValue && inputValue.startsWith('=')) {
      //TODO: thi thoảng khi nhập xong node nó sẽ set error về rỗng nên cần check để đề phòng spam submit
      const errorMessage = nodeInputValidate(inputValue, nodes, nodeFocused)
      if (errorMessage) {
        setError('input_value', { message: errorMessage })
        return
      }
    }

    saveHandler(nodeData)
    changeFormFocusState(false)
  }

  const handleFocus = () => {
    changeFormFocusState(true)
  }

  const style = JSON.parse(data.node_style || '{}')

  const handleKeyDown = (e: KeyboardEventReact<HTMLFormElement>) => {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      const name = (e.target as HTMLInputElement).name
      const inputArr = Object.keys(getValues())
      const currentIndex = inputArr.indexOf(name)
      const nextIndex = currentIndex === inputArr.length - 1 ? 0 : currentIndex + 1
      setFocus(inputArr[nextIndex] as keyof NodeFormProps)
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      if (error) return
      changeFormFocusState(false)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      saveValue()
    }
  }

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (isPaneClick(event)) {
      saveValue()
    }
  }

  const handleKeyDownListen = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return
    if (formFocus) return
    if (e.shiftKey && e.altKey && e.ctrlKey && e.metaKey) return
    if (e.key == 'Enter') {
      setNodeFocused(null)
    }
  }

  useEventListener('keydown', (e) => handleKeyDownListen(e))

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
      <Stack
        component="form"
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
            <Typography color="red.400" whiteSpace="nowrap" fontSize={13} lineHeight={'18px'}>
              {error}
            </Typography>
          </StackError>
        )}
        <FormProvider {...method}>
          <InputNode
            control={control}
            name="input_title"
            required
            label={t('kpi_node.label') as string}
            inputProps={{ style }}
            autoComplete="off"
          />

          <InputNodeFormula control={control} name="input_value" label="=" inputProps={{ style }} />

          <InputNode
            control={control}
            name="unit"
            label={t('kpi_node.unit') as string}
            inputProps={{ style }}
            autoComplete="off"
          />
        </FormProvider>
      </Stack>
    </ClickAwayListener>
  )
}

const NodeForm = memo(NodeFormInner) as typeof NodeFormInner

export { NodeForm }
