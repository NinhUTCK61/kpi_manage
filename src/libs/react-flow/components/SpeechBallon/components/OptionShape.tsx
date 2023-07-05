import { ShapeType } from '@/features/node'
import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { Slider, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSpeechBallonContext } from '../context'
import { useShapeStyle } from '../helper'
import { SpeechBallonForm } from './SpeechBallonForm'

export const CLASS_ARROW = 'dragArrow'
export const CLASS_SPEECH_BALLON = 'speechBallonNode'

export const OptionShape: React.FC = () => {
  const { getShapeStyles, getArrowStyles } = useShapeStyle()
  const speechBallonRef = useRef<HTMLDivElement>(null)
  const { data } = useSpeechBallonContext()
  const shapeType = data.shape as ShapeType
  const style = JSON.parse(data.node_style || '{}')
  const leftArrow = shapeType !== ShapeType.CIRCULAR ? style.leftArrow || 0 : 50

  const { updateReactFlowNode } = useNodeUpdateHandler()
  const [positionLeft, setPositionLeft] = useState<number>(0)
  const [isMove, setIsMove] = useState<boolean>(false)

  const handleChangeValue = (_: Event, newValue: number | number[]) => {
    if (shapeType !== ShapeType.CIRCULAR) {
      setPositionLeft(newValue as number)
      setIsMove(true)
    }
  }

  const handleMouseUp = () => {
    if (isMove) {
      const nodeStyle = JSON.stringify({ ...style, leftArrow: positionLeft })

      const dataConfig = {
        id: data.id,
        is_saved: data.is_saved,
        node_style: nodeStyle,
      }

      updateReactFlowNode(dataConfig, 'speech_ballon')
    }
  }

  const handleMouseLeave = () => {
    handleMouseUp()
  }

  useEffect(() => {
    setPositionLeft(leftArrow)
  }, [leftArrow])

  return (
    <>
      <MuiOptionShapeType sx={getShapeStyles} className={CLASS_SPEECH_BALLON} ref={speechBallonRef}>
        <SpeechBallonForm />
      </MuiOptionShapeType>

      <Slider
        track={false}
        sx={getArrowStyles}
        id={`arrow-${data.id}`}
        onChange={handleChangeValue}
        value={positionLeft}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </>
  )
}

const MuiOptionShapeType = styled('div')({
  position: 'relative',
  padding: '6px 12px 8px 12px',
})
