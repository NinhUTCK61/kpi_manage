import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener } from '@mui/material'
import { FormEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'
import { CtxMenuType } from '../../KPINode/components/ContextMenu'
import { useSpeechBallonContext } from '../context'
import { useSpeechBallonCreateMutation, useUpdateSpeechBallonMutation } from '../hooks'
import { InputSpeechBalloon } from './InputSpeechBalloon'

type SpeechBallonFormProps = {
  text: string
}

const storeSelector = (state: RFStore) => ({
  removeSpeechBallon: state.removeSpeechBallon,
  nodeFocused: state.nodeFocused,
  typeContext: state.typeContext,
  setTypeContext: state.setTypeContext,
})

export const SpeechBallonForm: React.FC = () => {
  const { data, xPos, yPos } = useSpeechBallonContext()

  const { removeSpeechBallon, nodeFocused, typeContext, setTypeContext } = useRFStore(
    storeSelector,
    shallow,
  )

  const { control, getValues, setFocus } = useForm<SpeechBallonFormProps>({
    defaultValues: {
      text: data.text,
    },
  })

  const { mutate: create } = useSpeechBallonCreateMutation()
  const { mutate: update } = useUpdateSpeechBallonMutation()

  const isEditing = !data.text || (nodeFocused?.id === data.id && typeContext === CtxMenuType.Edit)

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

    if (typeContext === CtxMenuType.Edit) {
      handleUpdate(createData)
      return
    }
    create(createData)
  }

  const handleUpdate = ({ updated_at, ...data }: SpeechBallonNodeType) => {
    if (nodeFocused?.id === data.id && nodeFocused?.type === 'speech_ballon') {
      update(data)
    }
    setTypeContext(null)
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
