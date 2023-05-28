import { styled } from '@mui/material'
import React, { useMemo } from 'react'
import { useSpeechBallonContext } from '../context'
import { SpeechBallonForm } from './SpeechBallonForm'

export const OptionShape: React.FC = () => {
  const { data } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = useMemo(() => {
    return style.stroke || 1
  }, [style.stroke])

  return (
    <MuiOptionShapeType
      sx={{
        ...style,
        border: `${stroke}px solid ${style.color}`,
      }}
    >
      <SpeechBallonForm />
      <Arrow
        sx={(theme) => ({
          borderTop: `20px solid ${style.background || theme.palette.customPrimary[600]}`,
          ' &:before': {
            content: '""',
            top: `-${23 - stroke}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'absolute',
            borderLeft: `${12 + stroke}px solid transparent`,
            borderRight: `${12 + stroke}px solid transparent`,
            borderTop: `${20 + stroke}px solid ${style.color}`,
            zIndex: -1,
          },
        })}
      />
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
}))
