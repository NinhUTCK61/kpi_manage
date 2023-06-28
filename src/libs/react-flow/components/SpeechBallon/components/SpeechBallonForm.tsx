import { ShapeType, ViewPortAction } from '@/features/node'
import { isPaneClick } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener } from '@mui/material'
import { FocusEvent, FormEvent, useEffect, useState } from 'react'
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
  viewPortAction: state.viewportAction,
  updateSpeechBallon: state.updateSpeechBallon,
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

  const { removeSpeechBallon, nodeFocused, viewPortAction } = useRFStore(storeSelector, shallow)

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
    handleSetEditing(false)
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

  const [isDoubleClick, setIsDoubleClick] = useState(false)

  const handleSingleClick = () => {
    setIsDoubleClick(false)
    setTimeout(() => {
      if (!isDoubleClick) {
        return false
      }
    }, 200)
  }

  const handleDoubleClick = () => {
    setIsDoubleClick(true)

    if (viewPortAction === ViewPortAction.SpeechBallon) {
      handleSetEditing(true)
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const length = e.target.value.length
    e.target.setSelectionRange(length, length)
  }

  const widthWhenResize = isResizing ? '100%' : style.width
  const isShapeCircular = data.shape === ShapeType.CIRCULAR

  const styleShape = isShapeCircular
    ? {
        width: '50%',
        height: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
      }
    : { width: '100%', height: style.height ? style.height : '100%' }

  const positionShape = isShapeCircular && {
    position: 'relative',
    height: '80%',
  }

  return isEditing ? (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={handleClickAway}>
      <SpeechBallonContainer sx={{ ...positionShape }}>
        <form onSubmit={handleSubmit} style={{ height: '100%' }}>
          <InputSpeechBalloon
            control={control}
            onKeyDown={handleKeyDown}
            multiline
            name="text"
            autoComplete="off"
            onFocus={handleFocus}
            autoFocus
            fullWidth
            inputProps={{
              style: {
                ...style,
                ...styleShape,
              },
            }}
            sx={{ ...(isShapeCircular && { height: '100%' }) }}
            controlProps={{ sx: { height: '100%' } }}
          />
        </form>
      </SpeechBallonContainer>
    </ClickAwayListener>
  ) : (
    <SpeechBallonContainer
      sx={{ ...positionShape, maxWidth: widthWhenResize }}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      <TextSpeechBallon
        sx={{
          ...style,
          ...styleShape,
        }}
      >
        {data.text}
      </TextSpeechBallon>
    </SpeechBallonContainer>
  )
}
