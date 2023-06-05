import { SvgIcon, SvgIconProps } from '@mui/material'

function Circular(style: SvgIconProps) {
  return (
    <SvgIcon
      {...style}
      viewBox="3.887 1.745 31.155 20.705"
      width="28"
      height="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.863"
        y="2.693"
        width="29.344"
        height="18.839"
        strokeWidth="1.9"
        rx="9.42"
        ry="9.42"
      />
    </SvgIcon>
  )
}

function SquareShape(style: SvgIconProps) {
  return (
    <SvgIcon
      {...style}
      width="25"
      height="25"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.25" y="0.75" width="22.5" height="22.5" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function RoundSquare(style: SvgIconProps) {
  return (
    <SvgIcon
      {...style}
      width="25"
      height="25"
      viewBox="0 0 24 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.75" y="0.75" width="22.5" height="17.5" rx="6.25" strokeWidth="1.5" />
    </SvgIcon>
  )
}

function MediumRoundSquare(style: SvgIconProps) {
  return (
    <SvgIcon
      {...style}
      width="25"
      height="25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        stroke={style.stroke}
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="3.25"
        strokeWidth="1.5"
      />
    </SvgIcon>
  )
}

export { Circular, SquareShape, RoundSquare, MediumRoundSquare }
