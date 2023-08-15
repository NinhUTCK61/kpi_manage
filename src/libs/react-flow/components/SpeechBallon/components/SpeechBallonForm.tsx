import { ShapeType, ViewPortAction } from '@/features/node'
import { isPaneClick } from '@/libs/react-flow/helper'
import { useRFStore } from '@/libs/react-flow/hooks'
import { UpdateStateReason } from '@/libs/react-flow/store'
import { RFStore, SpeechBallonNodeType } from '@/libs/react-flow/types'
import { ClickAwayListener } from '@mui/material'
import { FocusEvent, FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'
import { useSpeechBallonContext } from '../context'
import { sizeStyleMapping } from '../helper'
import {
  useSpeechBallonCreateMutation,
  useSpeechBallonDeleteMutation,
  useUpdateSpeechBallonMutation,
} from '../hooks'
import { CtxMenuType } from './ContextMenu'
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

const CLASS_DEFAULT_RESIZE_CONTROL = 'react-flow__resize-control'
const CLASS_MOVEABLE_DEFAULT = 'moveable-s'

export const SpeechBallonForm: React.FC = () => {
  const {
    data,
    xPos,
    yPos,
    isEditing: editable,
    handleSetEditing,
    isResizing,
    handleSetResize,
    isResizeEnabled,
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
  const { mutate: deleteSB } = useSpeechBallonDeleteMutation()

  const isEditing = !data.text || (editable && nodeFocused?.id === data.id)

  useEffect(() => {
    setTimeout(() => {
      if (isEditing) {
        setFocus('text')
        handleSetEditing(true)
      }
    }, 0)
  }, [isEditing, setFocus, handleSetEditing])

  function handleSubmit(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    if (!getValues().text) {
      if (data.is_saved) {
        deleteSB({ id: data.id })
      } else {
        removeSpeechBallon(data.id, UpdateStateReason.DeleteUnSavedSpeechBallonNode)
      }

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
    const shouldSubmit = isPaneClick(event) || data.is_saved

    if (event.target instanceof HTMLElement) {
      const className = event.target.className

      if (
        className.includes(CLASS_DEFAULT_RESIZE_CONTROL) ||
        className.includes(CLASS_MOVEABLE_DEFAULT)
      )
        return
    }

    if (shouldSubmit) {
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

  const handleClickAwayCloseResize = (event: MouseEvent | TouchEvent) => {
    if (!isResizeEnabled) return

    if (event.target instanceof HTMLElement) {
      const className = event.target.className
      if (
        className.includes(CLASS_DEFAULT_RESIZE_CONTROL) ||
        className.includes(CLASS_MOVEABLE_DEFAULT)
      )
        return
    }

    const styleContextMenu = document.getElementById(`menu-speech-ballon-${data.id}`)
    const styleMenuResizeItem = document.getElementById(`${CtxMenuType.Resize}-${data.id}`)
    if (
      styleMenuResizeItem?.contains(event.target as HTMLElement) ||
      styleContextMenu?.contains(event.target as HTMLElement)
    )
      return

    handleSetResize(false)
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
    : {
        width: '100%',
        height: style.height ? style.height : sizeStyleMapping[data.shape as ShapeType].height,
      }

  const positionShape = isShapeCircular && {
    position: 'relative',
    height: '80%',
  }

  return isEditing ? (
    <ClickAwayListener mouseEvent="onPointerDown" onClickAway={handleClickAway}>
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
    <ClickAwayListener mouseEvent="onPointerDown" onClickAway={handleClickAwayCloseResize}>
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
    </ClickAwayListener>
  )
}
