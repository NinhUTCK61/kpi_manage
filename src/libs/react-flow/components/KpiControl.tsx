import { greyScale } from '@/libs/config/theme'
import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
import ZoomInIcon from 'public/assets/svgs/zoom_in.svg'
import ZoomOutIcon from 'public/assets/svgs/zoom_out.svg'
import { useEffect, useState } from 'react'
import { Controls, useReactFlow } from 'reactflow'
function KpiControls() {
  const { setViewport, getViewport, getZoom } = useReactFlow()
  const [valueZoom, setValueZoom] = useState<number | null>()

  useEffect(() => {
    setTimeout(() => {
      setValueZoom(getZoom())
    }, 200)
  }, [getZoom])

  const handleZoom = async (isZoomIn?: boolean) => {
    if (!valueZoom) return
    let _valueZoom = valueZoom
    if (isZoomIn) {
      _valueZoom = _valueZoom <= 1.75 ? _valueZoom + 0.25 : _valueZoom
    } else {
      _valueZoom = _valueZoom > 0.25 ? _valueZoom - 0.25 : _valueZoom
    }
    const { x, y } = getViewport()
    setViewport({
      x,
      y,
      zoom: _valueZoom,
    })
    setValueZoom(_valueZoom)
  }

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
          {valueZoom && valueZoom * 100}%
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
