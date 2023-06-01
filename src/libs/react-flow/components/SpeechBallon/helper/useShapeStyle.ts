import { ShapeType } from '@/features/node'
import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'

export const useShapeStyle = () => {
  const { data } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const resizeBorder = isFill ? 0 : stroke
  const color = style.color || base.white
  const TypeShape = data.shape || ShapeType.MEDIUM_ROUND_SQUARE

  const DEFAULT_BORDER = 10

  let borderStyle = DEFAULT_BORDER

  switch (TypeShape) {
    case ShapeType.MEDIUM_ROUND_SQUARE:
      borderStyle = DEFAULT_BORDER
      break
    case ShapeType.CIRCULAR:
      borderStyle = 42
      break
    case ShapeType.ROUND_SQUARE:
      borderStyle = 16
      break
    case ShapeType.SQUARE:
      borderStyle = 0
      break
    default:
      break
  }

  const getShapeStyles = {
    ...style,
    color,
    border: !isFill && `${stroke}px solid ${conventionBg}`,
    background: isFill ? conventionBg : base.white,
    borderRadius: `${borderStyle}px`,
  }

  const getArrowStyles = {
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
