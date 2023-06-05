import { SvgIcon, SvgIconProps } from '@mui/material'

function Circular(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function SquareShape(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="1.25" y="0.75" width="21.5" height="22.5" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function RoundSquare(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="0.75" y="2" width="22.5" height="19" rx="6.25" strokeWidth="1.5" />
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

export { Circular, MediumRoundSquare, RoundSquare, SquareShape }
