import { ShapeType } from '@/features/node/constant'
import { useNodeUpdateHandler } from '@/features/node/views/hooks'
import { api } from '@/libs/api'
import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'
import { MouseEvent, startTransition, useCallback, useEffect, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

const borderStyleMapping = {
  [ShapeType.SQUARE]: 0,
  [ShapeType.CIRCULAR]: '100%',
  [ShapeType.MEDIUM_ROUND_SQUARE]: '10px',
  [ShapeType.ROUND_SQUARE]: '16px',
}

const sizeStyleMapping = {
  [ShapeType.SQUARE]: {
    width: 190,
    height: 190,
  },
  [ShapeType.CIRCULAR]: {
    width: 190,
    height: 190,
    padding: '20px 0',
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    width: 190,
    height: 190,
  },
  [ShapeType.ROUND_SQUARE]: {
    width: 210,
    height: 40,
  },
}

const DEFAULT_SIZE_ARROW = 20
const BORDER_SIZE_ARROW = 30
const TOP_DEFAULT = 30
const LEFT_DEFAULT = 25
const RIGHTCLICK = 2

export const useShapeStyle = () => {
  const { data, isResizing, isResizeEnabled } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const resizeBorder = isFill ? 0 : stroke
  const color = style.color || base.white
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const borderStyle = borderStyleMapping[shapeType]
  const sizeStyle = sizeStyleMapping[shapeType]

  const { updateReactFlowNode } = useNodeUpdateHandler()

  const [dragging, setDragging] = useState(false)
  const [distanceLeft, setDistanceLeft] = useState(LEFT_DEFAULT)
  const { isLoading } = api.speechBallon.update.useMutation()

  const handleMouseMove = (event: MouseEvent<HTMLElement>, maxWidth: number, clientX: number) => {
    if (dragging) {
      const element = event.target as HTMLElement
      const widthArrow = (element.offsetWidth + 20) / 2 // độ dài mũi tên
      const maxWidthCheck = maxWidth - widthArrow
      const changeLeftPx = event.clientX - clientX // delta x

      const test = (changeLeftPx / maxWidthCheck) * 100
      if (test > 20 && test < 80) {
        startTransition(() => {
          setDistanceLeft(test)
        })
      }
    }
    event.stopPropagation()
  }

  const [classArrow, setClassArrow] = useState<string>('')
  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (event.button === RIGHTCLICK) return
    if (shapeType === ShapeType.CIRCULAR) return
    const className = (event.target as HTMLElement).className.split(' ')
    if (!isResizeEnabled) return
    if (className.includes('dragArrow')) {
      setClassArrow(className.includes('dragArrow') ? 'dragArrow' : '')
      setDragging(true)
    }
  }

  const handleUpdate = useCallback(() => {
    const dataUpdate = {
      id: data.id,
      is_saved: data.is_saved,
    }

    if (style.leftArrow === distanceLeft) return

    const newNodeStyle = JSON.stringify({ ...style, leftArrow: distanceLeft })

    updateReactFlowNode(
      {
        ...dataUpdate,
        node_style: newNodeStyle,
      },
      'speech_ballon',
    )
  }, [data.id, data.is_saved, distanceLeft, style, updateReactFlowNode])

  const handleMouseUp = useCallback(
    (buttonMouse: number) => {
      if (!dragging) return
      if (buttonMouse === RIGHTCLICK) return
      if (isLoading) return
      if (!isResizeEnabled) return

      setDragging(false)

      if (classArrow) {
        handleUpdate()
      }
      setClassArrow('')
    },
    [classArrow, dragging, handleUpdate, isLoading, isResizeEnabled],
  )

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    handleMouseUp(e.button)
  }

  useEventListener('mouseup', (e) => handleMouseUp(e.button))

  useEffect(() => {
    const nodeStyle = JSON.parse(data.node_style || '{}')
    if (!nodeStyle) return
    setDistanceLeft(nodeStyle.leftArrow || LEFT_DEFAULT)
  }, [data, style.width])

  const arrowCircular = {
    ...(shapeType === ShapeType.CIRCULAR && {
      left: `calc(50%)`,
    }),
  }

  const strokeStyle = {
    ...(!isFill && {
      '&:before': {
        top: `-${TOP_DEFAULT + resizeBorder * 3}px`,
        content: '""',
        transform: 'translateX(-50%)',
        position: 'absolute',
        zIndex: 100,
        borderLeft: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
        borderRight: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
        borderTop: `${BORDER_SIZE_ARROW + resizeBorder}px solid white`,
      },
    }),
  }

  const getShapeStyles = {
    ...sizeStyle,
    ...style,
    ...(isResizing && { width: '100%', height: '100%' }),
    color,
    zIndex: isFill ? 100 : 0,
    border: `${!isFill ? stroke : 0}px solid ${conventionBg}`,
    background: isFill ? conventionBg : base.white,
    display: 'flex',
    alignItems: 'center',
    ...(borderStyle && { borderRadius: borderStyle }),
  }

  const getArrowStyles = {
    ...arrowCircular,
    ...strokeStyle,
    borderTop: `30px solid ${conventionBg}`,
    left: `${distanceLeft}%`,
  }
  return { getShapeStyles, getArrowStyles, handleMouseMove, handleMouseDown, handleMouseLeave }
}
