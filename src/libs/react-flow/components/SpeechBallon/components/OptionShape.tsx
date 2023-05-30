import { base, customPrimary } from '@/libs/config/theme'
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

  const isFill = data.stroke === 'Fill'

  const conventionBg = style.background || customPrimary[700]

  const resizeBorder = isFill ? 0 : stroke

  const color = style.color || base.black
  return (
    <MuiOptionShapeType
      sx={(theme) => ({
        ...style,
        color,
        border: !isFill && `${stroke}px solid ${conventionBg}`,
        background: isFill ? conventionBg : theme.palette.base.white,
      })}
    >
      <SpeechBallonForm />
      <Arrow
        sx={(theme) => ({
          borderTop: `20px solid ${isFill ? conventionBg : theme.palette.base.white}`,
          ' &:before': {
            content: '""',
            top: `-${20 - resizeBorder}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            position: 'absolute',
            borderLeft: `${12 + resizeBorder}px solid transparent`,
            borderRight: `${12 + resizeBorder}px solid transparent`,
            borderTop: `${20 + resizeBorder}px solid ${conventionBg}`,
            zIndex: -1,
          },
        })}
      />
    </MuiOptionShapeType>
  )
}

const MuiOptionShapeType = styled('div')(({ theme }) => ({
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
