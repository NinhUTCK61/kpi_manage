import { styled } from '@mui/material'
import React, { MouseEvent, useRef } from 'react'
import { useShapeStyle } from '../helper'

const HEIGHT_ARROW = 60
const WIDTH_ARROW_DEFAULT = 20

export const classArrow = 'dragArrow'
export const classSpeechBallon = 'speechBallonNode'

export const ArrowSpeechBallon: React.FC<{ refSpeechBallon: React.RefObject<HTMLDivElement> }> = ({
  refSpeechBallon,
}) => {
  const { getArrowStyles, handleMouseDown, handleMouseMove, handleMouseLeave } = useShapeStyle()
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (refSpeechBallon?.current) {
      const maxWidth = (refSpeechBallon.current as HTMLElement).clientWidth
      const clientX = (refSpeechBallon.current as HTMLElement).getBoundingClientRect().left
      handleMouseMove(event, maxWidth, clientX)
    }
  }

  const refArrow = useRef<HTMLDivElement>(null)

  return (
    <Arrow
      onMouseDown={handleMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={handleMouseLeave}
      className={classArrow}
      sx={getArrowStyles}
      ref={refArrow}
    />
  )
}

export const Arrow = styled('div')({
  position: 'absolute',
  content: '""',
  borderLeft: `${WIDTH_ARROW_DEFAULT}px solid transparent`,
  top: `calc(100% - 2px)`,
  left: '50px',
  transform: 'translateX(-50%)',
  borderRight: `${WIDTH_ARROW_DEFAULT}px solid transparent`,
  width: 10,
  '&:after': {
    position: 'absolute',
    content: '""',
    width: WIDTH_ARROW_DEFAULT * 10,
    top: `-30px`,
    transform: 'translateX(-50%)',
    height: HEIGHT_ARROW,
  },
})
