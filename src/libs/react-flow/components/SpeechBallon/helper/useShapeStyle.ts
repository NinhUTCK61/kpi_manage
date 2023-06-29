import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'
import { MouseEvent, useEffect, useState } from 'react'

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
const LEFTCLICK = 0
const RIGHTCLICK = 2

export const useShapeStyle = () => {
  const { data, isResizing } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const resizeBorder = isFill ? 0 : stroke
  const color = style.color || base.white
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const borderStyle = borderStyleMapping[shapeType]
  const sizeStyle = sizeStyleMapping[shapeType]
  const [dragging, setDragging] = useState<boolean>(false)

  const handleMouseMove = (event: MouseEvent<HTMLElement>, maxWidth: number) => {
    if (dragging) {
      //dx la khoang cach giua vi tri chuot va vi tri ban dau
      const element = event.target as HTMLElement
      const changeLeftPx = event.movementX + element.offsetLeft // Độ dài thay đổi + Vị trí left cũ

      const widthArrow = (element.offsetWidth + 20) / 2 // độ dài mũi tên
      const maxWidthCheck = maxWidth - widthArrow
      const minWidthCheck = widthArrow
      if (changeLeftPx < maxWidthCheck && changeLeftPx > minWidthCheck + 1) {
        element.style.left = `${changeLeftPx}px`
      }
    }
  }

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    if (event.button === RIGHTCLICK) return
    if (shapeType === ShapeType.CIRCULAR) return
    setDragging(true)
  }

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false)
    }
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

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
  }
  return { getShapeStyles, getArrowStyles, handleMouseMove, handleMouseDown }
}
