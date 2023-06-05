import { SvgIcon, SvgIconProps } from '@mui/material'

function Circular(props: SvgIconProps) {
  return (
    <SvgIcon {...props} fontSize="large">
      <rect x="1" y="7.693" width="29.344" height="18.839" strokeWidth="1.9" rx="9.42" ry="9.42" />
    </SvgIcon>
  )
}

function SquareShape(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="1.25" y="0.75" width="22.5" height="22.5" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function RoundSquare(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="0.75" y="0.75" width="22.5" height="17.5" rx="6.25" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function MediumRoundSquare(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="3.25" strokeWidth="1.5" />
    </SvgIcon>
  )
}

export { Circular, SquareShape, RoundSquare, MediumRoundSquare }
