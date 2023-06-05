import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'

const borderStyleMapping = {
  [ShapeType.SQUARE]: 0,
  [ShapeType.CIRCULAR]: 120,
  [ShapeType.MEDIUM_ROUND_SQUARE]: 10,
  [ShapeType.ROUND_SQUARE]: 16,
}

const sizeStyleMapping = {
  [ShapeType.SQUARE]: {
    width: 190,
    height: 190,
  },
  [ShapeType.CIRCULAR]: {
    width: 190,
    height: 190,
    padding: 4,
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    width: 190,
    height: 190,
  },
  [ShapeType.ROUND_SQUARE]: {
    width: 210,
    minHeight: 44,
  },
}

export const useShapeStyle = () => {
  const { data } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const resizeBorder = isFill ? 0 : stroke
  const color = style.color || base.white
  const shapeType = (data.shape as ShapeType) || ShapeType.ROUND_SQUARE

  const borderStyle = borderStyleMapping[shapeType]

  const sizeStyle = sizeStyleMapping[shapeType]

  const arrowCircular =
    shapeType === ShapeType.CIRCULAR
      ? {
          transform: 'rotate(30deg)',
          left: 48,
          top: 'calc(100% - 9px)',
        }
      : {}

  const getShapeStyles = {
    ...style,
    ...sizeStyle,
    color,
    border: !isFill && `${stroke}px solid ${conventionBg}`,
    background: isFill ? conventionBg : base.white,
    borderRadius: `${borderStyle}px`,
    display: 'flex',
    alignItems: 'center',
  }

  const getArrowStyles = {
    ...arrowCircular,
    borderTop: `20px solid ${isFill ? conventionBg : base.white}`,
    '&:before': {
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
  }
  return { getShapeStyles, getArrowStyles }
}
