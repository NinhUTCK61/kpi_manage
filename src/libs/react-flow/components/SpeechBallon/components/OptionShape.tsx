import { useSelectStyle } from '@/features/node/views/create/helper/useSelectStyle'
import { styled } from '@mui/material'
import React from 'react'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  const { getShapeStyled, getArrowStyled } = useSelectStyle()

  return (
    <MuiOptionShapeType sx={getShapeStyled}>
      <SpeechBallonForm />
      <Arrow sx={getArrowStyled} />
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
