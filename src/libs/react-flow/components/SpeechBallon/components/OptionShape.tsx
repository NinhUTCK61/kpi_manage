import { styled } from '@mui/material'
import React from 'react'
import { useSelectStyle } from '../helper'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  const { getShapeStyles, getArrowStyles } = useSelectStyle()

  return (
    <MuiOptionShapeType sx={getShapeStyles}>
      <SpeechBallonForm />
      <Arrow sx={getArrowStyles} />
    </MuiOptionShapeType>
  )
}

const MuiOptionShapeType = styled('div')({
  minWidth: 210,
  padding: '6px 12px',
  borderRadius: 12,
  position: 'relative',
})

export const Arrow = styled('div')({
  position: 'absolute',
  content: '""',
  left: 30,
  borderLeft: '12px solid transparent',
  borderRight: '12px solid transparent',
})
