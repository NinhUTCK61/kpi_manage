import { Box, styled } from '@mui/material'
import React from 'react'
import { useShapeStyle } from '../helper'
import { ArrowSpeechBallon } from './ArrowSpeechBallon'
import { SpeechBallonForm } from './SpeechBallonForm'

export const CLASS_SPEECH_BALLON = 'speechBallonNode'

export const OptionShape: React.FC = () => {
  const { getShapeStyles, getShapeContainer } = useShapeStyle()

  return (
    <>
      <Box sx={getShapeContainer}>
        <MuiOptionShapeType
          sx={{ ...getShapeStyles, zIndex: 1000, width: '100%', height: '100%' }}
          className={CLASS_SPEECH_BALLON}
        >
          <SpeechBallonForm />
        </MuiOptionShapeType>
        <ArrowSpeechBallon />
      </Box>
    </>
  )
}

const MuiOptionShapeType = styled('div')({
  position: 'relative',
  padding: '6px 12px 8px 12px',
})
