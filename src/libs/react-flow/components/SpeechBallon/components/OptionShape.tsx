import { styled } from '@mui/material'
import React from 'react'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  return (
    <MuiOptionShapeType>
      <SpeechBallonForm />
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
