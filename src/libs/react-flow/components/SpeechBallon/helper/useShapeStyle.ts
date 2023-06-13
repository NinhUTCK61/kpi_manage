import { ShapeType } from '@/features/node/constant'
import { base, customPrimary } from '@/libs/config/theme'
import {
  useSpeechBallonActionContext,
  useSpeechBallonContext,
} from '@/libs/react-flow/components/SpeechBallon/context'

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
    height: 36,
  },
}

const DEFAULT_SIZE_ARROW = 12
const BORDER_SIZE_ARROW = 20

export const useShapeStyle = () => {
  const { data } = useSpeechBallonContext()
  const { isResizing } = useSpeechBallonActionContext()
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
          left: `calc(50% - ${DEFAULT_SIZE_ARROW}px)`,
        }
      : {}

  const getShapeStyles = {
    ...sizeStyle,
    ...style,
    ...(isResizing && { width: '100%', height: '100%' }),
    color,
    border: `${!isFill ? stroke : 0}px solid ${conventionBg}`,
    background: isFill ? conventionBg : base.white,
    display: 'flex',
    alignItems: 'center',
    borderRadius: borderStyle && borderStyle,
  }

  const getArrowStyles = {
    ...arrowCircular,
    borderTop: `20px solid ${isFill ? conventionBg : base.white}`,
    '&:before': {
      content: '""',
      top: `-${BORDER_SIZE_ARROW - resizeBorder}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      position: 'absolute',
      borderLeft: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
      borderRight: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
      borderTop: `${BORDER_SIZE_ARROW + resizeBorder}px solid ${conventionBg}`,
      zIndex: -1,
    },
  }
  return { getShapeStyles, getArrowStyles }
}
