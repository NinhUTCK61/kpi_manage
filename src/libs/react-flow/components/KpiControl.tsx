import { greyScale } from '@/libs/config/theme'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ZoomInIcon from 'public/assets/svgs/zoom_in.svg'
import ZoomOutIcon from 'public/assets/svgs/zoom_out.svg'
import { useEffect, useLayoutEffect } from 'react'
import { Controls, useReactFlow, useViewport } from 'reactflow'
import { useDebounce } from 'usehooks-ts'
import { useRFStore } from '../hooks'

function KpiControls() {
  const { setViewport, getViewport } = useReactFlow()
  const zoom = useRFStore((state) => state.zoom)
  const handleZoom = useRFStore((state) => state.handleZoom)
  const setZoom = useRFStore((state) => state.setZoom)
  const { zoom: zoomViewPort } = useViewport()
  const zoomDebounce = useDebounce(zoomViewPort, 100)

  useEffect(() => {
    setZoom(Number(zoomDebounce.toFixed(2)))
  }, [setZoom, zoomDebounce])

  useLayoutEffect(() => {
    if (zoom) {
      const { x, y } = getViewport()
      // get current x y to set viewport after zoom
      setViewport({
        x,
        y,
        zoom,
      })
    }
  }, [getViewport, setViewport, zoom])

  return (
    <Controls
      style={{
        bottom: 44,
        right: 44,
        border: `1px solid ${greyScale[500]}`,
        borderRadius: 24,
        padding: '11px 23px',
        margin: 0,
      }}
      position="bottom-right"
      showInteractive={false}
      showFitView={false}
      showZoom={false}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Image
          src={ZoomOutIcon}
          alt="zoom"
          onClick={() => handleZoom()}
          style={{ cursor: 'pointer' }}
        />

        <Typography width={43} textAlign="center">
          {zoom && (zoom * 100).toFixed(0)}%
        </Typography>

        <Image
          src={ZoomInIcon}
          alt="zoom"
          onClick={() => handleZoom(true)}
          style={{ cursor: 'pointer' }}
        />
      </Stack>
    </Controls>
  )
}

export { KpiControls }
