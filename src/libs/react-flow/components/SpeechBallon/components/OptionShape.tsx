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
  position: 'relative',
  padding: '6px 12px 8px 12px',
})

export const Arrow = styled('div')({
  position: 'absolute',
  content: '""',
  top: 'calc(100% - 4px)',
  left: 30,
  borderLeft: '12px solid transparent',
  borderRight: '12px solid transparent',
})
