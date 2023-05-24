import { styled } from '@mui/material'
import React from 'react'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  return (
    <MuiOptionShapeType>
      <SpeechBallonForm />
      <Arrow />
    </MuiOptionShapeType>
  )
}

const MuiOptionShapeType = styled('div')(({ theme }) => ({
  background: theme.palette.customPrimary[600],
  minWidth: 210,
  padding: '6px 12px',
  borderRadius: 12,
  position: 'relative',
}))

export const Arrow = styled('div')(({ theme }) => ({
  position: 'absolute',
  content: '""',
  left: 30,
  borderLeft: '12px solid transparent',
  borderRight: '12px solid transparent',
  borderTop: `20px solid ${theme.palette.customPrimary[600]}`,
}))
