import { PANE_CLASS_NAME } from '@/libs/react-flow/constant'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener } from '@mui/material'
import { FocusEvent, FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'
import { useSpeechBallonContext } from '../context'
import { useSpeechBallonCreateMutation, useUpdateSpeechBallonMutation } from '../hooks'
import { InputSpeechBalloon } from './InputSpeechBalloon'

type SpeechBallonFormProps = {
  text: string
}

const storeSelector = (state: RFStore) => ({
  removeSpeechBallon: state.removeSpeechBallon,
  nodeFocused: state.nodeFocused,
})

export const SpeechBallonForm: React.FC = () => {
  const { data, xPos, yPos, isEditing: editable, handleSetEditing } = useSpeechBallonContext()
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
    const targetClass = (event.target as HTMLDivElement).className
    if (targetClass === PANE_CLASS_NAME && !data.text) {
      removeSpeechBallon(data.id)
    }

    handleSetEditing(false)
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const length = e.target.value.length
    e.target.setSelectionRange(length, length)
  }

  return isEditing ? (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
      <form onSubmit={handleSubmit}>
        <InputSpeechBalloon
          control={control}
          onKeyDown={handleKeyDown}
          multiline
          maxRows={5}
          name="text"
          autoComplete="off"
          onFocus={handleFocus}
          inputProps={{ style }}
        />
      </form>
    </ClickAwayListener>
  ) : (
    <InputSpeechBalloon
      control={control}
      multiline
      maxRows={5}
      name="text"
      readOnly
      inputProps={{ style }}
    />
  )
}
