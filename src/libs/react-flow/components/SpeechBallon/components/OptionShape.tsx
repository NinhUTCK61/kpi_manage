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
  position: 'relative',
  background: theme.palette.customPrimary[600],
  minWidth: 210,
  minHeight: 36,
  padding: '6px 15px',
  '::placeholder': {
    color: theme.palette.customPrimary[0o0],
  },
  borderRadius: 12,
  '::before': {
    position: 'absolute',
    content: '""',
    top: '97%',
    left: '20%',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: `20px solid ${theme.palette.customPrimary[600]}`,
    height: 21,
    width: 19,
  },
}))
