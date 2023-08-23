import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { Box, styled } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import Moveable, { DIRECTIONS, OnRender, OnRotate, OnWarpEnd } from 'react-moveable'
import { useSpeechBallonContext } from '../context'
import { ARROW_HEIGHT, ARROW_WIDTH, DEFAULT_ARROW_TRANSFORM, useShapeStyle } from '../helper'

function ArrowSpeechBallon() {
  const { updateReactFlowNode } = useNodeUpdateHandler()
  const { data, isResizeEnabled, nodeResizing, isResizing } = useSpeechBallonContext()
  const { getArrowStyles, insideArrow, getArrowBoxStyles } = useShapeStyle()

  const style = isResizing
    ? JSON.parse(nodeResizing?.data.node_style || '{}')
    : JSON.parse(data.node_style || '{}')

  const arrowWidth = style.arrowWidth || ARROW_WIDTH
  const arrowHeight = style.arrowHeight || ARROW_HEIGHT
  const arrowTransform = style.arrowTransform || DEFAULT_ARROW_TRANSFORM

  useLayoutEffect(() => {
    if (targetRef.current) {
      targetRef.current.style.width = arrowWidth
      targetRef.current.style.maxWidth = arrowWidth
      targetRef.current.style.height = arrowHeight
      targetRef.current.style.transform = arrowTransform

      if (moveableRef.current) {
        moveableRef.current.moveable.updateRect()
      }
    }
  }, [arrowHeight, arrowWidth, arrowTransform])

  const targetRef = useRef<HTMLDivElement | null>(null)

  const onRotateEnd = (e: OnWarpEnd) => {
    const nodeStyle = JSON.stringify({
      ...style,
      arrowTransform: e.target.style.transform,
      arrowWidth: getArrowStyles.maxWidth,
      arrowHeight: e.target.style.height,
    })

    const dataConfig = {
      id: data.id,
      is_saved: data.is_saved,
      node_style: nodeStyle,
    }

    updateReactFlowNode(dataConfig, 'speech_ballon')
  }

  const onRenderButtonControl = (e: OnRender) => {
    e.target.style.cssText += e.cssText
  }

  const onRotate = (e: OnRotate) => {
    e.target.style.transform = e.transform
  }

  const moveableRef = useRef<Moveable>(null)

  return (
    <>
      <Box sx={getArrowBoxStyles}>
        <Box sx={getArrowStyles} ref={targetRef}>
          <Box sx={insideArrow} />
        </Box>
      </Box>
      {isResizeEnabled && (
        <MoveableContainer
          target={targetRef}
          keepRatio={false}
          renderDirections={['s']}
          onRotate={onRotate}
          onRotateEnd={onRotateEnd}
          rotatable={{
            renderDirections: DIRECTIONS,
          }}
          resolveAblesWithRotatable={{
            resizable: ['s'],
          }}
          resizable={{
            renderDirections: false,
          }}
          rotateAroundControls={true}
          onRender={onRenderButtonControl}
          ref={moveableRef}
          scalable={false}
        />
      )}
    </>
  )
}

const MoveableContainer = styled(Moveable)({
  '& .moveable-line': {
    display: 'none',
  },
  '& .moveable-origin': {
    display: 'none',
  },
  '& .moveable-control': {
    display: 'none',
  },
  '& .moveable-rotation': {
    display: 'none',
  },
  '& .moveable-control.moveable-s': {
    display: 'block',
  },
})

export { ArrowSpeechBallon }
