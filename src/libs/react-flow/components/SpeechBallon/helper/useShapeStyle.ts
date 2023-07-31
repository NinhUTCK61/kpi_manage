import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '../context'

const borderStyleMapping = {
  [ShapeType.SQUARE]: 0,
  [ShapeType.CIRCULAR]: '100%',
  [ShapeType.MEDIUM_ROUND_SQUARE]: '10px',
  [ShapeType.ROUND_SQUARE]: '16px',
}

export const sizeStyleMapping = {
  [ShapeType.SQUARE]: {
    width: 150,
    height: 150,
  },
  [ShapeType.CIRCULAR]: {
    width: 150,
    height: 150,
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    width: 150,
    height: 150,
  },
  [ShapeType.ROUND_SQUARE]: {
    width: 150,
    height: 45,
  },
}

export const WIDTH_ARROW = 30
export const HEIGHT_ARROW = 41

export const useShapeStyle = () => {
  const { data, isResizing } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const color = style.color || base.white
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE
  const borderStyle = borderStyleMapping[shapeType]
  const sizeStyle = sizeStyleMapping[shapeType]

  const getShapeStyles = {
    ...style,
    color,
    background: isFill ? conventionBg : base.white,
    display: 'flex',
    alignItems: 'center',
    ...(borderStyle && { borderRadius: borderStyle }),
  }

  const transformArrow = style.transformArrow
    ? style.transformArrow.slice(style.transformArrow.indexOf(')') + 1)
    : 'rotate(-21.15397deg) '

  const getShapeContainer = {
    ...sizeStyle,
    ...getShapeStyles,
    ...(isResizing && { width: '100%', height: '100%' }),
    border: `${!isFill ? stroke : 0}px solid ${conventionBg}`,
    transition: 'all 0.3s',
  }

  const getArrowBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'top center',
    transform: 'translate(-50%)',
  }

  const getArrowStyles = {
    maxWidth: style.widthArrow || WIDTH_ARROW,
    height: style.heightArrow || HEIGHT_ARROW,
    width: '100%',
    background: conventionBg,
    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    transformOrigin: 'top center',
    transform: transformArrow,
  }

  const insideArrow = {
    height: `calc(100% - ${stroke * 3}px)`,
    width: `calc(100% - ${stroke * 2}px)`,
    background: isFill ? conventionBg : base.white,
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%)',
    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
  }
  return {
    getShapeStyles,
    getArrowStyles,
    getShapeContainer,
    getArrowBox,
    insideArrow,
  }
}
