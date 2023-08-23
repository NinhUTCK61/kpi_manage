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

export const ARROW_WIDTH = '30px'
export const ARROW_HEIGHT = '41px'
export const DEFAULT_ARROW_TRANSFORM = 'rotate(-21.15397deg) '

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

  const arrowTransform = style.arrowTransform
    ? style.arrowTransform.slice(style.arrowTransform.indexOf(')') + 1)
    : DEFAULT_ARROW_TRANSFORM

  const getShapeContainer = {
    ...sizeStyle,
    ...getShapeStyles,
    ...(isResizing && { width: '100%', height: '100%' }),
    border: `${!isFill ? stroke : 0}px solid ${conventionBg}`,
    // transition: 'all 0.2s',
  }

  const getArrowBoxStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transformOrigin: 'top center',
    transform: 'translate(-50%)',
  }

  const getArrowStyles = {
    maxWidth: style.arrowWidth || ARROW_WIDTH,
    height: style.arrowHeight || ARROW_HEIGHT,
    width: '100%',
    background: conventionBg,
    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
    transformOrigin: 'top center',
    transform: arrowTransform,
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
    getArrowBoxStyles,
    insideArrow,
  }
}
