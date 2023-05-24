import { useRFStore } from '@/libs/react-flow/hooks'
import { ClickAwayListener } from '@mui/material'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSpeechBallonContext } from '../context'
import { useSpeechBallonCreateMutation } from '../hooks'
import { InputSpeechBalloon } from './InputSpeechBalloon'

type SpeechBallonFormProps = {
  text: string
}

export const SpeechBallonForm: React.FC = () => {
  const { data, xPos, yPos } = useSpeechBallonContext()
  const removeSpeechBallon = useRFStore((state) => state.removeSpeechBallon)
  const { control, getValues, setFocus } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: data.text,
    },
  })
  const { mutate: create } = useSpeechBallonCreateMutation()

  const isEditing = !data.text

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

    const createData = {
      ...data,
      x: xPos,
      y: yPos,
      text: getValues().text,
    }

    create(createData)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClickAway = () => {
    if (!data.text) {
      removeSpeechBallon(data.id)
    }
  }

  return isEditing ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <form onSubmit={handleSubmit}>
        <InputSpeechBalloon
          control={control}
          onKeyDown={handleKeyDown}
          multiline
          maxRows={5}
          name="text"
          autoComplete="off"
        />
      </form>
    </ClickAwayListener>
  ) : (
    <InputSpeechBalloon control={control} multiline maxRows={5} name="text" readOnly />
  )
}
