import { ShapeType } from '@/features/node/constant'
import { base, blue, customPrimary, yellow } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'

const DEFAULT_SIZE_ARROW = 17
const BORDER_SIZE_ARROW = 31
const TOP_DEFAULT = 31
const WIDTH_ARROW_DEFAULT = 14

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

const arrowTrackMapping = {
  [ShapeType.SQUARE]: {
    width: `calc(100% - 28px)`,
  },
  [ShapeType.CIRCULAR]: {
    width: `calc(100%)`,
  },
  [ShapeType.MEDIUM_ROUND_SQUARE]: {
    width: `calc(100% - 42px)`,
  },
  [ShapeType.ROUND_SQUARE]: {
    width: `calc(100% - 46px)`,
  },
}

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

  const strokeStyle = {
    ...(!isFill && {
      '&:before': {
        top: `-${TOP_DEFAULT + resizeBorder * 3}px`,
        content: '""',
        position: 'absolute',
        zIndex: 100,
        borderLeft: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
        borderRight: `${DEFAULT_SIZE_ARROW + resizeBorder}px solid transparent`,
        borderTop: `${BORDER_SIZE_ARROW + resizeBorder}px solid white`,
        boxShadow: 'none',
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
    ...arrowTrackMapping[shapeType],
    position: 'absolute',
    cursor: 'grab',
    padding: 0,
    bottom: -13,
    color: base.white,
    '&& .MuiSlider-rail': {
      display: 'none',
    },
    '&& .MuiSlider-thumb': {
      borderRadius: 0,
      borderTop: `25px solid ${conventionBg}`,
      borderLeft: `${WIDTH_ARROW_DEFAULT}px solid transparent`,
      borderRight: `${WIDTH_ARROW_DEFAULT}px solid transparent`,
      transition: 'none',
      ...strokeStyle,
      '&.Mui-active': {
        boxShadow: 'none',
      },
      '&:hover': {
        boxShadow: 'none',
      },
      '&:after': isResizeEnabled
        ? {
            content: "''",
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            width: 10,
            height: 10,
            backgroundColor: yellow[400],
            transform: 'rotate(45deg) translateX(-65%)',
            border: `1px solid ${blue[400]}`,
            borderRadius: 0,
          }
        : { display: 'none' },
    },
  }
  return {
    getShapeStyles,
    getArrowStyles,
  }
}
