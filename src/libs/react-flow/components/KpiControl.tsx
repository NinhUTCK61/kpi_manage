import { greyScale } from '@/libs/config/theme'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ZoomInIcon from 'public/assets/svgs/zoom_in.svg'
import ZoomOutIcon from 'public/assets/svgs/zoom_out.svg'
import { useState } from 'react'
import { ControlButton, Controls, useReactFlow, useViewport } from 'reactflow'
function KpiControls() {
  const { zoomIn, zoomOut, getZoom } = useReactFlow()
  const [valueZoom, setValueZoom] = useState<number>(getZoom() * 100)
  const { zoom } = useViewport()
  console.log({ zoom })

  const handleZoomIn = async () => {
    await zoomIn()
    setTimeout(() => {
      setValueZoom(getZoom() * 100)
    }, 200)
  }
  const handleZoomOut = async () => {
    await zoomOut()
    setTimeout(() => {
      setValueZoom(getZoom() * 100)
    }, 200)
  }
  return (
    <Controls
      style={{
        bottom: 50,
        border: `1px solid ${greyScale[500]}`,
        borderRadius: 24,
        padding: '12px 24px',
      }}
      position="bottom-right"
      showInteractive={false}
      showFitView={false}
      showZoom={false}
      onZoomIn={() => console.log('zoom in')}
      onZoomOut={() => console.log('zoom out')}
    >
      <Stack direction="row" spacing={1}>
        <ControlButton onClick={() => handleZoomOut()} title="-">
          <Image src={ZoomOutIcon} alt="zoom" />
        </ControlButton>
        <Typography>{Math.floor(valueZoom * 10e2) / 10e2}%</Typography>
        <ControlButton onClick={() => handleZoomIn()} title="+">
          <Image src={ZoomInIcon} alt="zoom" />
        </ControlButton>
      </Stack>
    </Controls>
  )
}

export { KpiControls }
