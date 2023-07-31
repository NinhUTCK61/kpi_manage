import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { Box, styled } from '@mui/material'
import { useLayoutEffect, useMemo, useRef } from 'react'
import Moveable, { DIRECTIONS, OnRender, OnRotate, OnWarpEnd } from 'react-moveable'
import { useSpeechBallonContext } from '../context'
import { HEIGHT_ARROW, WIDTH_ARROW, useShapeStyle } from '../helper'

function ArrowSpeechBallon() {
  const { updateReactFlowNode } = useNodeUpdateHandler()
  const { data, isResizeEnabled, arrowResize } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')

  const { getArrowStyles, insideArrow, getArrowBox } = useShapeStyle()

  const widthArrow = useMemo(() => {
    return arrowResize.widthArrow || style.widthArrow || WIDTH_ARROW
  }, [style.widthArrow, arrowResize.widthArrow])

  const heightArrow = useMemo(() => {
    return arrowResize.heightArrow || style.heightArrow || HEIGHT_ARROW
  }, [style.heightArrow, arrowResize.heightArrow])

  console.log(widthArrow, heightArrow)

  useLayoutEffect(() => {
    if (targetRef.current) {
      targetRef.current.style.width = widthArrow + 'px'
      targetRef.current.style.maxWidth = widthArrow + 'px'
      targetRef.current.style.height = heightArrow + 'px'
      if (moveableRef.current) {
        moveableRef.current.moveable.updateRect()
      }
    }
  }, [heightArrow, widthArrow])

  const targetRef = useRef<HTMLDivElement | null>(null)

  const onRotateEnd = (e: OnWarpEnd) => {
    const nodeStyle = JSON.stringify({
      ...style,
      transformArrow: e.target.style.transform,
      widthArrow: getArrowStyles.maxWidth,
      heightArrow: e.target.style.height,
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
      <Box sx={getArrowBox}>
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
