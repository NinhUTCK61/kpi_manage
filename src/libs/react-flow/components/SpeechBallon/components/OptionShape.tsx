import { styled } from '@mui/material'
import React, { useRef } from 'react'
import { useShapeStyle } from '../helper'
import { ArrowSpeechBallon } from './ArrowSpeechBallon'
import { SpeechBallonForm } from './SpeechBallonForm'

export const classArrow = 'dragArrow'
export const classSpeechBallon = 'speechBallonNode'

export const OptionShape: React.FC = () => {
  const { getShapeStyles } = useShapeStyle()
  const refSpeechBallon = useRef<HTMLDivElement>(null)

  return (
    <>
      <MuiOptionShapeType sx={getShapeStyles} className={classSpeechBallon} ref={refSpeechBallon}>
        <SpeechBallonForm />
      </MuiOptionShapeType>
      <ArrowSpeechBallon refSpeechBallon={refSpeechBallon} />
    </>
  )
}

const MuiOptionShapeType = styled('div')({
  position: 'relative',
  padding: '6px 12px 8px 12px',
})
