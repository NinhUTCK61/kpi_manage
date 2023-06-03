function Circular() {
  return (
    <svg
      viewBox="3.887 1.745 31.155 20.705"
      width="28"
      height="25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.863"
        y="2.693"
        width="29.344"
        height="18.839"
        stroke="black"
        strokeWidth="1.5"
        rx="9.42"
        ry="9.42"
      />
    </svg>
  )
}

function SquareShape() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.25" y="0.75" width="22.5" height="22.5" stroke="black" strokeWidth="1.5" />
    </svg>
  )
}

function RoundSquare() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="17.5"
        rx="6.25"
        stroke="black"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function MediumRoundSquare() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="3.25"
        stroke="#222222"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export { Circular, SquareShape, RoundSquare, MediumRoundSquare }
