import { base, customPrimary } from '@/libs/config/theme'
import { useSpeechBallonContext } from '@/libs/react-flow/components/SpeechBallon/context'

export const useSelectStyle = () => {
  const { data } = useSpeechBallonContext()
  const style = JSON.parse(data.node_style || '{}')
  const stroke = style.stroke || 1
  const isFill = data.layout === 'FILL'
  const conventionBg = style.background || customPrimary[700]
  const resizeBorder = isFill ? 0 : stroke
  const color = style.color || base.black

  const getStyleShape = {
    ...style,
    color,
    border: !isFill && `${stroke}px solid ${conventionBg}`,
    background: isFill ? conventionBg : base.white,
  }

  const getStyleArrow = {
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
  return { getStyleShape, getStyleArrow }
}
