import { isPaneClick } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener } from '@mui/material'
import { FocusEvent, FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'
import { useSpeechBallonContext } from '../context'
import { useSpeechBallonCreateMutation, useUpdateSpeechBallonMutation } from '../hooks'
import { InputSpeechBalloon } from './InputSpeechBalloon'
import { SpeechBallonContainer, TextSpeechBallon } from './style'

type SpeechBallonFormProps = {
  text: string
}

const storeSelector = (state: RFStore) => ({
  removeSpeechBallon: state.removeSpeechBallon,
  nodeFocused: state.nodeFocused,
})

export const SpeechBallonForm: React.FC = () => {
  const {
    data,
    xPos,
    yPos,
    isEditing: editable,
    handleSetEditing,
    isResizing,
  } = useSpeechBallonContext()
  const { removeSpeechBallon, nodeFocused } = useRFStore(storeSelector, shallow)

  const { control, getValues, setFocus } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: data.text,
    },
    values: { text: data.text },
  })

  let style = JSON.parse(data.node_style || '{}')
  style = { ...style, background: 'inherit' }

  const { mutate: create } = useSpeechBallonCreateMutation()
  const { mutate: update } = useUpdateSpeechBallonMutation()

  const isEditing = !data.text || (editable && nodeFocused?.id === data.id)

  useEffect(() => {
    setTimeout(() => {
      if (isEditing) {
        setFocus('text')
      }
    }, 0)
  }, [isEditing, setFocus])

  function handleSubmit(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    if (!getValues().text) {
      removeSpeechBallon(data.id)
      return
    }

    const mutateData = {
      ...data,
      x: xPos,
      y: yPos,
      text: getValues().text,
    }

    if (data.is_saved) {
      handleUpdate(mutateData)
      return
    }

    create(mutateData)
  }

  const handleUpdate = (data: SpeechBallonNodeType) => {
    update(data)
    handleSetEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (isPaneClick(event)) {
      handleSubmit()
    }

    handleSetEditing(false)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const length = e.target.value.length
    e.target.setSelectionRange(length, length)
  }

  const widthWhenResize = isResizing ? '100%' : style.width && style.width
  const heightWhenResize = isResizing ? '100%' : style.height && style.height

  return isEditing ? (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
      <SpeechBallonContainer width="100%">
        <form onSubmit={handleSubmit}>
          <InputSpeechBalloon
            control={control}
            onKeyDown={handleKeyDown}
            multiline
            name="text"
            autoComplete="off"
            onFocus={handleFocus}
            fullWidth
            sx={{
              ...style,
              width: '100%',
              height: heightWhenResize,
            }}
          />
        </form>
      </SpeechBallonContainer>
    </ClickAwayListener>
  ) : (
    <SpeechBallonContainer sx={{ maxWidth: widthWhenResize }}>
      <TextSpeechBallon
        sx={{
          ...style,
          width: 'auto',
          height: 'auto',
        }}
      >
        {data.text}
      </TextSpeechBallon>
    </SpeechBallonContainer>
  )
}
