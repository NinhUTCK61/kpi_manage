import { styled } from '@mui/material'
import React from 'react'
import { useShapeStyle } from '../helper'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  const { getShapeStyles, getArrowStyles } = useShapeStyle()

  return (
    <MuiOptionShapeType sx={getShapeStyles}>
      <SpeechBallonForm />
      <Arrow sx={getArrowStyles} />
    </MuiOptionShapeType>
  )
}

const MuiOptionShapeType = styled('div')({
  minWidth: 210,
  padding: 12,
  position: 'relative',
})

export const Arrow = styled('div')({
  position: 'absolute',
  content: '""',
  top: 'calc(100% - 6px)',
  left: 30,
  bottom: -15,
  borderLeft: '12px solid transparent',
  borderRight: '12px solid transparent',
})
