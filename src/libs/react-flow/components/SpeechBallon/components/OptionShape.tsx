import { useRFStore } from '@/libs/react-flow/hooks'
import { Box, ClickAwayListener, styled } from '@mui/material'
import React, { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useSpeechBallonContext } from '../context'
import { useShapeStyle } from '../helper'
import { ArrowSpeechBallon } from './ArrowSpeechBallon'
import { CtxMenuType } from './ContextMenu'
import {
  CLASS_DEFAULT_RESIZE_CONTROL,
  CLASS_MOVEABLE_DEFAULT,
  SpeechBallonForm,
} from './SpeechBallonForm'

export const CLASS_SPEECH_BALLON = 'speechBallonNode'

export const OptionShape: React.FC = () => {
  const { getShapeStyles, getShapeContainer } = useShapeStyle()
  const nodeFocused = useRFStore((state) => state.nodeFocused)
  const { isResizeEnabled, handleSetResize } = useSpeechBallonContext()

  const handleClickAwayCloseResize = (event: MouseEvent | TouchEvent) => {
    if (!isResizeEnabled) return

    if (event.target instanceof HTMLElement) {
      const { id, className } = event.target

      if (
        className.includes(CLASS_DEFAULT_RESIZE_CONTROL) ||
        className.includes(CLASS_MOVEABLE_DEFAULT) ||
        id === `menu-speech-ballon-${nodeFocused?.id}` ||
        id === `${CtxMenuType.Resize}-${nodeFocused?.id}`
      )
        return
    }

    handleSetResize(false)
  }

  const speechBallonRef = useRef(null)
  useOnClickOutside(speechBallonRef, handleClickAwayCloseResize)

  return (
    <ClickAwayListener onClickAway={handleClickAwayCloseResize}>
      <Box sx={getShapeContainer} ref={speechBallonRef}>
        <MuiOptionShapeType
          sx={{ ...getShapeStyles, zIndex: 1000, width: '100%', height: '100%' }}
          className={CLASS_SPEECH_BALLON}
        >
          <SpeechBallonForm />
        </MuiOptionShapeType>
        <ArrowSpeechBallon />
      </Box>
    </ClickAwayListener>
  )
}

const MuiOptionShapeType = styled('div')({
  position: 'relative',
  padding: '6px 12px 8px 12px',
})
